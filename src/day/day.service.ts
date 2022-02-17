import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import { Task } from 'src/task/entities/task.entity';
import { CreateDayDto } from './dto/create-day.dto';
import { Day } from './entities/day.entity';

@Injectable()
export class DayService {
  constructor(
    @InjectRepository(Day)
    private readonly dayRepository: Repository<Day>,
  ) {}

  getRepository() {
    return this.dayRepository;
  }

  create(dto: CreateDayDto) {
    const day = new Day();
    day.tasks = dto.tasks.map(({ name, date }) => {
      const task = new Task();
      task.name = name;

      if (date) {
        task.date = date;
      }

      return task;
    });

    return day;
  }

  findOne(options?: FindManyOptions<Day>) {
    return this.dayRepository.findOneOrFail(options);
  }

  findByPK(id: number, options?: FindOneOptions<Day>) {
    return this.dayRepository.findOneOrFail({ id }, options);
  }

  increaseViews(id: number) {
    return this.dayRepository.update({ id }, { views: () => 'views + 1' });
  }
}
