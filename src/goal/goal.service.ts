import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { Operation } from 'src/abstracts/operation';
import { Characteristic } from 'src/abstracts/characteristic';
import { CreateDayDto } from 'src/day/dto/create-day.dto';
import { DayCharacteristic } from 'src/day-characteristic/day-characteristic.entity';
import { GoalCharacteristic } from 'src/goal-characteristic/goal-characteristic.entity';
import { Reaction } from 'src/reaction/reaction.entity';
import { UserService } from 'src/user/user.service';
import { DayService } from 'src/day/day.service';
import { CreateGoalDto } from './dto/create-goal.dto';
import { GoalStageDto } from './dto/goal-stage.dto';
import { Goal } from './goal.entity';

@Injectable()
export class GoalService {
  constructor(
    @InjectRepository(Goal)
    private readonly goalRepository: Repository<Goal>,
    private readonly userService: UserService,
    private readonly dayService: DayService,
  ) {}

  async save(userID: number, dto: CreateGoalDto) {
    const { name, hashtags, tasks } = dto;
    const goal = new Goal();
    const day = this.dayService.create({ tasks });

    goal.name = name;
    goal.characteristic = new GoalCharacteristic();
    goal.hashtags = hashtags;
    goal.stages = dto.stages;
    goal.days = [day];
    goal.owner = await this.userService.findByPK(userID);

    return await this.goalRepository.save(goal);
  }

  async findByPK(id: number, options?: FindOneOptions<Goal>) {
    return await this.goalRepository.findOneOrFail({ id }, options);
  }

  async findCalendar(id: number) {
    return await this.dayService
      .getRepository()
      .createQueryBuilder('day')
      .leftJoinAndSelect('day.goal', 'goal')
      .select(['day.id as id', 'day.date as date'])
      .where('goal.id = :id', { id })
      .orderBy('day.id', 'ASC')
      .getRawMany();
  }

  async addDay(id: number, dto: CreateDayDto) {
    const goal = await this.findByPK(id, { relations: ['days'] });
    const day = this.dayService.create(dto);
    day.stage = goal.stage;
    goal.days.push(day);

    return await this.goalRepository.save(goal);
  }

  async updateStage(id: number, dto: GoalStageDto) {
    const goal = await this.findByPK(id);

    goal.stage = dto.stage;

    return await this.goalRepository.save(goal);
  }

  async updateCharacteristic(
    userID: number,
    id: number,
    dayID: number,
    characteristic: Characteristic,
    operation: Operation,
  ) {
    const user = await this.userService.findByPK(userID);
    const goal = await this.findByPK(id, { relations: ['characteristic'] });
    const day = await this.dayService.findByPK(dayID, { relations: ['characteristic'] });
    // todo check on exists
    if (!day.characteristic) {
      day.characteristic = new DayCharacteristic();
    }

    day.characteristic[characteristic] += operation === 'insert' ? 1 : -1;
    goal.characteristic[characteristic] += operation === 'insert' ? 1 : -1;

    return this.goalRepository.manager.transaction(async (transactionalManager) => {
      await transactionalManager[operation](Reaction, { user, characteristic, day });
      await transactionalManager.save(day);
      await transactionalManager.save(goal);
    });
  }
}
