import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { Operation } from 'src/abstracts/operation';
import { Characteristic } from 'src/abstracts/characteristic';
import { CreateDayDto } from 'src/day/dto/create-day.dto';
import { DayCharacteristic } from 'src/day-characteristic/day-characteristic.entity';
import { GoalCharacteristic } from 'src/goal-characteristic/goal-characteristic.entity';
import { UserService } from 'src/user/user.service';
import { DayService } from 'src/day/day.service';
import { CreateGoalDto } from './dto/create-goal.dto';
import { Goal } from './goal.entity';

@Injectable()
export class GoalService {
  constructor(
    @InjectRepository(Goal)
    private readonly goalRepository: Repository<Goal>,
    private readonly userService: UserService,
    private readonly dayService: DayService,
  ) {}

  async save(userId: number, dto: CreateGoalDto) {
    const { name, hashtags, tasks } = dto;
    const goal = new Goal();
    const day = this.dayService.create({ tasks });

    goal.name = name;
    goal.characteristic = new GoalCharacteristic();
    goal.hashtags = hashtags;
    goal.days = [day];
    goal.owner = await this.userService.findByPK(userId);

    return await this.goalRepository.save(goal);
  }

  async findByPK(id: number, options?: FindOneOptions<Goal>) {
    return await this.goalRepository.findOneOrFail({ id }, options);
  }

  async findDates(id: number) {
    return await this.dayService.find({
      select: ['id', 'date'],
      where: {
        goal: id,
      },
      order: {
        id: 'ASC',
      },
    });
  }

  async addDay(id: number, dto: CreateDayDto) {
    const goal = await this.findByPK(id);
    const day = this.dayService.create(dto);

    goal.days.push(day);

    return await this.goalRepository.save(goal);
  }

  async updateCharacteristic(
    userId: number,
    id: number,
    dayId: number,
    characteristic: Characteristic,
    operation: Operation,
  ) {
    const goal = await this.goalRepository
      .createQueryBuilder('goal')
      .leftJoinAndSelect('goal.characteristic', 'characteristic')
      .leftJoinAndSelect('goal.days', 'days')
      .leftJoinAndSelect('days.characteristic', 'day_characteristic')
      .where('goal.id = :id', { id })
      .andWhere('days.id = :dayId', { dayId })
      .getOne();
    const day = goal?.days[0];

    if (!day) {
      throw new HttpException('day id is not exists', HttpStatus.NOT_FOUND);
    }

    if (!day.characteristic) {
      day.characteristic = new DayCharacteristic();
    }

    switch (operation) {
      case 'add':
        day.characteristic[characteristic].push(userId);
        goal.characteristic[characteristic] += 1;
        break;
      case 'remove':
        day.characteristic[characteristic] = day.characteristic[characteristic].filter((u) => u !== userId);
        goal.characteristic[characteristic] -= 1;
        break;
    }

    return await this.goalRepository.save(goal);
  }
}
