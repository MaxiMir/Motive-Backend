import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { GoalCharacteristic } from 'src/goal-characteristic/goal-characteristic.entity';
import { Day } from 'src/day/day.entity';
import { Task } from 'src/task/task.entity';
import { Hashtag } from 'src/hashtag/hashtag.entity';
import { User } from 'src/user/user.entity';
import { CreateGoalDto } from './dto/create-goal.dto';
import { Goal } from './goal.entity';

@Injectable()
export class GoalService {
  constructor(
    @InjectRepository(Goal)
    private readonly goalRepository: Repository<Goal>,
  ) {}

  async findByPK(id: number) {
    return await this.goalRepository.findOneOrFail({ id });
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
    goal.days = [day];
    goal.hashtags = dto.hashtags.map((name) => {
      const hashtag = new Hashtag();
      hashtag.name = name;

      return hashtag;
    });

    const userRepository = getRepository(User); // !!! TODO Временно
    goal.owner = (await userRepository.findOne(1)) as User;

    return await this.goalRepository.save(goal);
  }
}
