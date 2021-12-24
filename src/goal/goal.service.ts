import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { GoalCharacteristic } from 'src/goal-characteristic/goal-characteristic.entity';
import { Day } from 'src/day/day.entity';
import { Task } from 'src/task/task.entity';
import { Hashtag } from 'src/hashtag/hashtag.entity';
import { UserService } from 'src/user/user.service';
import { CreateGoalDto } from './dto/create-goal.dto';
import { Goal } from './goal.entity';

@Injectable()
export class GoalService {
  constructor(
    @InjectRepository(Goal)
    private readonly goalRepository: Repository<Goal>,
    private readonly userService: UserService,
  ) {}

  async findByPK(id: number, options?: FindOneOptions<Goal>) {
    return await this.goalRepository.findOneOrFail({ id }, options);
  }

  async findDates(id: number) {
    const a = await getRepository(Day)
      .createQueryBuilder('day')
      .select(['day.id', 'day.date'])
      .where('day.goalId = :id', { id })
      .getMany();

    return a.reduce((acc, { id, date }) => ({ ...acc, [date]: id }), {});
  }

  async save(dto: CreateGoalDto) {
    const goal = new Goal();
    const day = new Day();

    goal.name = dto.name;
    goal.characteristic = new GoalCharacteristic();
    day.tasks = dto.tasks.map(({ name, date }) => {
      const task = new Task();
      task.name = name;
      task.date = date;

      return task;
    });
    goal.hashtags = dto.hashtags.map((name) => {
      const hashtag = new Hashtag();
      hashtag.name = name;

      return hashtag;
    });
    goal.days = [day];
    goal.owner = await this.userService.findByPK(1); // Todo

    return await this.goalRepository.save(goal);
  }
}
