import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
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
    return this.dayRepository.create({
      date: dto.date,
      tasks: dto.tasks.map(({ name, date }) => {
        const task = new Task();
        task.name = name;

        if (date) {
          task.date = date;
        }

        return task;
      }),
    });
  }

  findOne(options?: FindOneOptions<Day>) {
    return this.dayRepository.findOneOrFail(options);
  }

  findByPK(id: number, options?: FindOneOptions<Day>) {
    return this.dayRepository.findOneOrFail({ id }, options);
  }

  increaseViews(id: number) {
    return this.dayRepository.increment({ id }, 'views', 1);
  }
}
