import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron } from '@nestjs/schedule';
import { In, Raw, Repository } from 'typeorm';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { NotificationDto } from 'src/common/notification.dto';
import { CharacteristicDto } from 'src/common/characteristic.dto';
import { CreateDayDto } from 'src/day/dto/create-day.dto';
import { DayCharacteristic } from 'src/day-characteristic/entities/day-characteristic.entity';
import { GoalCharacteristic } from 'src/goal-characteristic/entities/goal-characteristic.entity';
import { UserCharacteristic } from 'src/user-characteristic/entities/user-characteristic.entity';
import { Reaction } from 'src/reaction/entities/reaction.entity';
import { SubscriptionService } from 'src/subscription/subscription.service';
import { UserService } from 'src/user/user.service';
import { ExpService } from 'src/exp/exp.service';
import { DayService } from 'src/day/day.service';
import { Member } from 'src/member/entities/member.entity';
import { FileService } from 'src/file/file.service';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateStageDto } from './dto/update-stage.dto';
import { Goal } from './entities/goal.entity';

@Injectable()
export class GoalService {
  constructor(
    @InjectRepository(Goal)
    private readonly goalRepository: Repository<Goal>,
    private readonly userService: UserService,
    private readonly dayService: DayService,
    private readonly subscriptionService: SubscriptionService,
    private readonly expService: ExpService,
    private readonly fileService: FileService,
  ) {}

  @Cron('00 30 23 * * *')
  async handleAbandoned() {
    const goals = await this.goalRepository.find({
      relations: ['owner', 'days', 'days.feedback'],
      where: {
        updated: Raw((alias) => `${alias} < CURRENT_DATE - ${process.env.EAT_AFTER_DAYS}`),
        completed: false,
      },
    });

    if (!goals.length) return;

    const owners = goals.map((g) => g.owner.id);
    const ownersCount = owners.reduce<Map<number, number>>(
      (acc, id) => acc.set(id, 1 + (acc.get(id) || 0)),
      new Map(),
    );
    const multipleOwnersCount = Object.entries(Object.fromEntries(ownersCount)).filter(([, v]) => v > 1);
    const photos = goals
      .map((g) => g.days.map((d) => d.feedback?.photos?.map((p) => p.src)))
      .flat(3)
      .filter(Boolean);

    return this.goalRepository.manager.transaction(async (transactionalManager) => {
      await transactionalManager.increment(UserCharacteristic, { user: In(owners) }, 'abandoned', 1);
      await Promise.all(
        multipleOwnersCount.map(([id, value]) =>
          transactionalManager.increment(UserCharacteristic, { user: Number(id) }, 'abandoned', value - 1),
        ),
      );
      await transactionalManager.delete(Member, { goal: In(owners) });
      await transactionalManager.remove(goals);
      photos.forEach(this.fileService.removeImage);
    });
  }

  @Cron('00 45 23 * * *')
  async handleWebCoverage() {
    const goals = await this.goalRepository.find({
      relations: ['owner'],
      where: {
        updated: Raw((alias) => `${alias} = CURRENT_DATE - ${process.env.SHOW_WEB_AFTER_DAYS}`),
        completed: false,
      },
    });

    if (!goals.length) return;

    const followersMap = await goals.reduce(async (promise, { owner }) => {
      return promise.then(async (acc) => {
        if (acc.has(owner.id)) {
          return acc;
        }

        const followers = await this.subscriptionService.findFollowers(owner.id);

        return acc.set(owner.id, followers);
      });
    }, Promise.resolve(new Map()));
    const insertData = goals.reduce(
      (acc, goal) => [
        ...acc,
        ...followersMap.get(goal.owner.id).map((recipient) => ({
          type: NotificationDto.WebCoverage,
          details: { id: goal.id, name: goal.name, user: goal.owner },
          recipient,
        })),
      ],
      [],
    );

    return this.goalRepository.manager.transaction(async (transactionalManager) => {
      await transactionalManager
        .createQueryBuilder()
        .insert()
        .into(Notification)
        .values(insertData)
        .execute();
    });
  }

  async save(dto: CreateGoalDto, userId: number) {
    const owner = await this.userService.findByPK(userId);
    const goal = new Goal();
    const day = this.dayService.create({ date: dto.started, tasks: dto.tasks }, userId);
    goal.name = dto.name;
    goal.started = dto.started;
    goal.updated = dto.started;
    goal.characteristic = new GoalCharacteristic();
    goal.hashtags = dto.hashtags;
    goal.stages = dto.stages;
    goal.days = [day];
    goal.owner = owner;

    return this.goalRepository.save(goal);
  }

  findByPK(id: number, options?: FindOneOptions<Goal>) {
    return this.goalRepository.findOneOrFail({ id }, options);
  }

  findCalendar(id: number) {
    return this.dayService
      .getRepository()
      .createQueryBuilder('day')
      .select(['day.id as id', 'day.date as date'])
      .where('day.goal.id = :id', { id })
      .orderBy('day.id', 'ASC')
      .getRawMany();
  }

  async addDay(id: number, dto: CreateDayDto, userId: number) {
    const owner = { id: userId };
    const goal = await this.goalRepository.findOneOrFail({
      where: { id, owner },
      relations: ['days'],
    });
    const day = this.dayService.create(dto, userId);
    day.stage = goal.stage;
    goal.days.push(day);
    goal.updated = dto.date;

    return this.goalRepository.save(goal);
  }

  async updateStage(id: number, dto: UpdateStageDto, ownerId: number) {
    const owner = { id: ownerId };

    return this.goalRepository.update({ id, owner }, { stage: dto.stage });
  }

  async updateCharacteristic(id: number, dayId: number, characteristic: CharacteristicDto, userId: number) {
    const user = await this.userService.findByPK(userId);
    const uniq = this.getUniq(userId, dayId, characteristic);
    const goal = await this.findByPK(id, { relations: ['characteristic'] });
    const day = await this.dayService.findByPK(dayId, { relations: ['characteristic'] });
    const canReact = this.checkCanChange(goal, userId);

    if (!canReact) {
      throw new BadRequestException();
    }

    if (!day.characteristic) {
      day.characteristic = new DayCharacteristic();
      day.characteristic[characteristic] = 0;
    }

    day.characteristic[characteristic] += 1;
    goal.characteristic[characteristic] += 1;

    return this.goalRepository.manager.transaction(async (transactionalManager) => {
      if (goal.completed) {
        const criteria = { user: { id: goal.ownerId } };
        const userCharacteristic = await transactionalManager
          .getRepository(UserCharacteristic)
          .findOneOrFail(criteria);
        const field = `${characteristic}_all`;
        const fieldValue = userCharacteristic[field] + 1;

        await transactionalManager.update(UserCharacteristic, criteria, {
          [field]: fieldValue,
          [characteristic]: this.expService.getProgress(fieldValue),
        });
      }

      await transactionalManager.insert(Reaction, { user, characteristic, goal, day, uniq });
      await transactionalManager.save(day);
      await transactionalManager.save(goal);
    });
  }

  getUniq(userId: number, dayId: number, characteristic: CharacteristicDto) {
    return [userId, dayId, characteristic].join(':');
  }

  checkCanChange(goal: Goal, userId: number) {
    return goal.ownerId !== userId;
  }
}
