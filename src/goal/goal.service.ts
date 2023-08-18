import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron } from '@nestjs/schedule';
import { In, Raw, Repository } from 'typeorm';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { NotificationTypeDto } from 'src/common/notification-type.dto';
import { OperationDto } from 'src/common/operation.dto';
import { CreateDayDto } from 'src/day/dto/create-day.dto';
import { NotificationEntity } from 'src/notification/entities/notification.entity';
import { UserCharacteristicEntity } from 'src/user-characteristic/entities/user-characteristic.entity';
import { SubscriptionService } from 'src/subscription/subscription.service';
import { UserService } from 'src/user/user.service';
import { ExpService } from 'src/exp/exp.service';
import { DayService } from 'src/day/day.service';
import { DayPointEntity } from 'src/day-point/entities/day-point.entity';
import { MemberEntity } from 'src/member/entities/member.entity';
import { FileService } from 'src/file/file.service';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateStageDto } from './dto/update-stage.dto';
import { GoalEntity } from './entities/goal.entity';

@Injectable()
export class GoalService {
  constructor(
    @InjectRepository(GoalEntity)
    private readonly goalRepository: Repository<GoalEntity>,
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
    const images = goals
      .flatMap((g) =>
        g.days.reduce((acc, d) => [...acc, ...(d.feedback?.photos?.map((p) => p.src) || [])], [g.cover]),
      )
      .filter((v): v is string => Boolean(v));

    return this.goalRepository.manager.transaction(async (transactionalManager) => {
      await transactionalManager.increment(UserCharacteristicEntity, { user: In(owners) }, 'abandoned', 1);
      await Promise.all(
        multipleOwnersCount.map(([id, value]) =>
          transactionalManager.increment(
            UserCharacteristicEntity,
            { user: Number(id) },
            'abandoned',
            value - 1,
          ),
        ),
      );
      await transactionalManager.delete(MemberEntity, { goal: In(owners) });
      await transactionalManager.remove(goals);
      images.forEach(this.fileService.removeImage);
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
          type: NotificationTypeDto.WebCoverage,
          details: { id: goal.id, name: goal.name },
          initiator: goal.owner,
          recipient,
        })),
      ],
      [],
    );

    return this.goalRepository.manager.transaction(async (transactionalManager) => {
      await transactionalManager
        .createQueryBuilder()
        .insert()
        .into(NotificationEntity)
        .values(insertData)
        .execute();
    });
  }

  async save(dto: CreateGoalDto, userId: number) {
    const owner = await this.userService.findByPK(userId);
    const goal = new GoalEntity();
    const day = this.dayService.create({ date: dto.started, tasks: dto.tasks }, userId);
    goal.name = dto.name;
    goal.sphere = dto.sphere;
    goal.started = dto.started;
    goal.updated = dto.started;
    goal.hashtags = dto.hashtags;
    goal.stages = dto.stages;
    goal.days = [day];
    goal.owner = owner;

    return this.goalRepository.save(goal);
  }

  async delete(id: number, owner: number) {
    const goal = await this.goalRepository.findOneOrFail({
      where: { id, owner, updated: Raw((alias) => `${alias} = CURRENT_DATE`) },
      relations: ['days', 'days.feedback'],
    });
    const images = goal.days
      .flatMap<string | null>((d) => d.feedback?.photos?.map((p) => p.src))
      .concat(goal.cover)
      .filter(Boolean);

    return this.goalRepository.manager.transaction(async (transactionalManager) => {
      await transactionalManager.remove(goal);
      images.forEach(this.fileService.removeImage);
    });
  }

  findByPK(id: number, options?: FindOneOptions<GoalEntity>) {
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

  async updatePoints(id: number, dayId: number, operation: OperationDto, userId: number) {
    const user = await this.userService.findByPK(userId);
    const uniq = [userId, dayId].join(':');
    const goal = await this.findByPK(id);
    const day = await this.dayService.findByPK(dayId);
    const canReact = goal.ownerId !== userId;
    const incrementBy = operation === 'insert' ? 1 : -1;

    if (!canReact) {
      throw new BadRequestException();
    }

    goal.points += incrementBy;
    day.points += incrementBy;
    day.pointsRated += incrementBy;

    return this.goalRepository.manager.transaction(async (transactionalManager) => {
      if (goal.completed) {
        const criteria = { user: { id: goal.ownerId } };
        const userCharacteristic = await transactionalManager
          .getRepository(UserCharacteristicEntity)
          .findOneOrFail(criteria);

        await transactionalManager.update(UserCharacteristicEntity, criteria, {
          points: userCharacteristic.points + incrementBy,
        });
      }

      await transactionalManager[operation](DayPointEntity, { user, goal, day, uniq });
      await transactionalManager.save(day);
      await transactionalManager.save(goal);
    });
  }

  async updateCover(file: Express.Multer.File, id: number, owner: number) {
    const goal = await this.goalRepository.findOneOrFail({ where: { id, owner } });
    const newCover = await this.fileService.uploadImage(file, 'avatars', { width: 900 });
    const prevCover = goal.cover;
    goal.cover = newCover.src;

    if (prevCover) {
      this.fileService.removeImage(prevCover);
    }

    return this.goalRepository.save(goal);
  }

  async deleteCover(id: number, owner: number) {
    const goal = await this.goalRepository.findOneOrFail({ where: { id, owner } });

    if (!goal.cover) return;

    this.fileService.removeImage(goal.cover);
    goal.cover = null;

    return this.goalRepository.save(goal);
  }
}
