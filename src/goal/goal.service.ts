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
import { UserService } from 'src/user/user.service';
import { DayService } from 'src/day/day.service';
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
  ) {}

  async save(dto: CreateGoalDto, userId: number) {
    const owner = await this.userService.findByPK(userId);
    const goal = new Goal();
    const day = this.dayService.create({ date: dto.tasksDate, tasks: dto.tasks }, userId);
    goal.name = dto.name;
    goal.started = dto.started;
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

    return this.goalRepository.save(goal);
  }

  async updateStage(id: number, dto: UpdateStageDto, ownerId: number) {
    const owner = { id: ownerId };

    return this.goalRepository.update({ id, owner }, { stage: dto.stage });
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
