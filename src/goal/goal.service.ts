import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { Operation } from 'src/abstracts/operation';
import { Characteristic } from 'src/abstracts/characteristic';
import { CreateDayDto } from 'src/day/dto/create-day.dto';
import { DayCharacteristic } from 'src/day-characteristic/entities/day-characteristic.entity';
import { GoalCharacteristic } from 'src/goal-characteristic/entities/goal-characteristic.entity';
import { Reaction } from 'src/reaction/entities/reaction.entity';
import { Confirmation } from 'src/confirmation/entities/confirmation.entity';
import { UserService } from 'src/user/user.service';
import { ExpService } from 'src/exp/exp.service';
import { FileService } from 'src/file/file.service';
import { DayService } from 'src/day/day.service';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateStageDto } from './dto/update-stage.dto';
import { UpdateCompletedDto } from './dto/update-completed.dto';
import { FindQuery } from './dto/find-query';
import { Goal } from './entities/goal.entity';

@Injectable()
export class GoalService {
  constructor(
    @InjectRepository(Goal)
    private readonly goalRepository: Repository<Goal>,
    private readonly userService: UserService,
    private readonly dayService: DayService,
    private readonly fileService: FileService,
  ) {}

  async save(dto: CreateGoalDto, userId: number) {
    const user = await this.userService.findByPK(userId);
    const goal = new Goal();
    const day = this.dayService.create({ date: dto.date, tasks: dto.tasks });
    goal.name = dto.name;
    goal.started = dto.started;
    goal.characteristic = new GoalCharacteristic();
    goal.hashtags = dto.hashtags;
    goal.stages = dto.stages;
    goal.days = [day];
    goal.owner = user;

    return this.goalRepository.save(goal);
  }

  findByPK(id: number, options?: FindOneOptions<Goal>) {
    return this.goalRepository.findOneOrFail({ id }, options);
  }

  async find(query: FindQuery) {
    const { where, take, skip } = query;

    return this.goalRepository.find({
      relations: ['characteristic', 'owner', 'confirmation'],
      where,
      order: {
        id: 'DESC',
      },
      take,
      skip,
    });
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
    const day = this.dayService.create(dto);
    day.stage = goal.stage;
    goal.days.push(day);

    return this.goalRepository.save(goal);
  }

  async updateStage(id: number, dto: UpdateStageDto, ownerId: number) {
    const owner = { id: ownerId };

    return this.goalRepository.update({ id, owner }, { stage: dto.stage });
  }

  async updateConfirmation(
    id: number,
    dto: UpdateCompletedDto,
    photos: Express.Multer.File[],
    userId: number,
  ) {
    const owner = await this.userService.findByPK(userId, { relations: ['characteristic'] });
    const goal = await this.findByPK(id, { relations: ['characteristic'] });
    goal.confirmation = new Confirmation();
    goal.confirmation.photos = await this.fileService.uploadAndMeasureImages(photos, 'confirmation');

    if (dto.text) {
      goal.confirmation.text = dto.text;
    }

    if (goal.characteristic.creativity) {
      owner.characteristic.creativity_all += goal.characteristic.creativity;
      owner.characteristic.creativity = ExpService.getProgress(owner.characteristic.creativity_all);
    }

    if (goal.characteristic.support) {
      owner.characteristic.support_all += goal.characteristic.support;
      owner.characteristic.support = ExpService.getProgress(owner.characteristic.support_all);
    }

    owner.characteristic.completed += 1;
    owner.characteristic.motivation_all += goal.characteristic.motivation + ExpService.EXTRA_POINTS;
    owner.characteristic.motivation = ExpService.getProgress(owner.characteristic.motivation_all);

    return this.goalRepository.manager.transaction(async (transactionalManager) => {
      await transactionalManager.save(goal);
      await transactionalManager.save(owner);
    });
  }

  async updateCharacteristic(
    id: number,
    dayId: number,
    characteristic: Characteristic,
    operation: Operation,
    userId: number,
  ) {
    const user = { id: userId };
    const uniq = this.getUniq(userId, dayId, characteristic);
    const goal = await this.findByPK(id, { relations: ['characteristic'] });
    const day = await this.dayService.findByPK(dayId, { relations: ['characteristic'] });
    const canReact = this.checkCanReact(goal, userId);

    if (!canReact) {
      throw new BadRequestException();
    }

    if (!day.characteristic) {
      day.characteristic = new DayCharacteristic();
      day.characteristic[characteristic] = 0;
    }

    day.characteristic[characteristic] += operation === 'insert' ? 1 : -1;
    goal.characteristic[characteristic] += operation === 'insert' ? 1 : -1;

    return this.goalRepository.manager.transaction(async (transactionalManager) => {
      await transactionalManager[operation](Reaction, {
        user,
        characteristic,
        goal,
        day,
        uniq,
      });
      await transactionalManager.save(day);
      await transactionalManager.save(goal);
    });
  }

  getUniq(userId: number, dayId: number, characteristic: Characteristic) {
    return [userId, dayId, characteristic].join(':');
  }

  checkCanReact(goal: Goal, userId: number) {
    return goal.ownerId !== userId;
  }
}
