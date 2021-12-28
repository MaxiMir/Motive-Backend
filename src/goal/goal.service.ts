import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { Operation } from 'src/abstracts/operation';
import { Characteristic } from 'src/abstracts/characteristic';
import { DayCharacteristic } from 'src/day-characteristic/day-characteristic.entity';
import { GoalCharacteristic } from 'src/goal-characteristic/goal-characteristic.entity';
import { Day } from 'src/day/day.entity';
import { Task } from 'src/task/task.entity';
import { HashtagService } from 'src/hashtag/hashtag.service';
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
    private readonly hashtagService: HashtagService,
  ) {}

  async findByPK(id: number, options?: FindOneOptions<Goal>) {
    return await this.goalRepository.findOneOrFail({ id }, options);
  }

  async findDates(id: number) {
    return await this.dayService.find({
      select: ['id', 'date'],
      where: {
        goal: id,
      },
    });
  }

  async save(userId: number, dto: CreateGoalDto) {
    const goal = new Goal();
    const day = new Day();

    goal.name = dto.name;
    goal.characteristic = new GoalCharacteristic();
    goal.hashtags = await this.hashtagService.upsert(dto.hashtags);
    day.tasks = dto.tasks.map(({ name, date }) => {
      const task = new Task();
      task.name = name;
      task.date = date;

      return task;
    });
    goal.days = [day];
    goal.owner = await this.userService.findByPK(userId);

    return await this.goalRepository.save(goal);
  }

  async updateCharacteristic(
    userId: number,
    goalId: number,
    dayId: number,
    characteristic: Characteristic,
    operation: Operation,
  ) {
    const dayRepository = this.dayService.getRepository();
    const day = await this.dayService.findByPK(dayId, { relations: ['characteristic'] });
    const goal = await this.findByPK(goalId, { relations: ['characteristic'] });

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

    await dayRepository.save(day);
    await this.goalRepository.save(goal);
  }
}
