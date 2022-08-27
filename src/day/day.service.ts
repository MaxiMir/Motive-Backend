import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { TaskEntity } from 'src/task/entities/task.entity';
import { CreateDayDto } from './dto/create-day.dto';
import { DayEntity } from './entities/day.entity';

@Injectable()
export class DayService {
  constructor(
    @InjectRepository(DayEntity)
    private readonly dayRepository: Repository<DayEntity>,
  ) {}

  getRepository() {
    return this.dayRepository;
  }

  create(dto: CreateDayDto, userId: number) {
    return this.dayRepository.create({
      date: dto.date,
      tasks: dto.tasks.map(({ name, date }) => {
        const task = new TaskEntity();
        task.name = name;

        if (date) {
          task.date = date;
        }

        task.userId = userId;

        return task;
      }),
    });
  }

  findOne(options?: FindOneOptions<DayEntity>) {
    return this.dayRepository.findOneOrFail(options);
  }

  findByPK(id: number, options?: FindOneOptions<DayEntity>) {
    return this.dayRepository.findOneOrFail({ id }, options);
  }

  increaseViews(id: number) {
    return this.dayRepository.increment({ id }, 'views', 1);
  }
}
