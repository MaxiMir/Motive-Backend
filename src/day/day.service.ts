import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectLiteral, Repository } from 'typeorm';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { FindConditions } from 'typeorm/find-options/FindConditions';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import { Task } from 'src/task/task.entity';
import { CreateDayDto } from './dto/create.day.dto';
import { Day } from './day.entity';

@Injectable()
export class DayService {
  constructor(
    @InjectRepository(Day)
    private readonly dayRepository: Repository<Day>,
  ) {}

  getRepository() {
    return this.dayRepository;
  }

  async find(options?: FindManyOptions<Day>) {
    return await this.dayRepository.find(options);
  }

  async findByPK(id: number, options?: FindOneOptions<Day>) {
    return await this.dayRepository.findOneOrFail({ id }, options);
  }

  async findLast(where?: FindConditions<Day> | ObjectLiteral) {
    const [day] = await this.dayRepository.find({
      where,
      order: {
        id: 'DESC',
      },
      take: 1,
    });

    return day;
  }

  async save(dto: CreateDayDto) {
    const day = new Day();

    day.tasks = dto.tasks.map(({ name, date }) => {
      const task = new Task();
      task.name = name;
      task.date = date;

      return task;
    });
  }

  async increaseViews(id: number) {
    const day = await this.findByPK(id);
    day.views += 1;

    await this.dayRepository.save(day);
  }
}
