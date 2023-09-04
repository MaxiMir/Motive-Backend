import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { TaskEntity } from 'src/task/entities/task.entity';
import { DayPointService } from 'src/day-point/day-point.service';
import { CreateDayDto } from './dto/create-day.dto';
import { DayEntity } from './entities/day.entity';

@Injectable()
export class DayService {
  constructor(
    @InjectRepository(DayEntity)
    private readonly dayRepository: Repository<DayEntity>,
    private readonly dayPointService: DayPointService,
  ) {}

  getRepository() {
    return this.dayRepository;
  }

  create(dto: CreateDayDto, userId: number) {
    return this.dayRepository.create({
      date: dto.date,
      tasks: dto.tasks.map(({ name, date, description, priority }) => {
        const task = new TaskEntity();
        task.name = name;
        task.date = date || null;
        task.description = description || null;
        task.priority = priority || null;

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

  async findByPKWithRated(id: number, options?: FindOneOptions<DayEntity>) {
    const day = await this.findByPK(id, options);
    const lastRated = await this.dayPointService
      .getRepository()
      .createQueryBuilder('day-point')
      .leftJoinAndSelect('day-point.user', 'user')
      .select([
        'day-point.day.id as day',
        'user.id as id',
        'user.nickname as nickname',
        'user.name as name',
        'user.avatar as avatar',
      ])
      .where('day-point.day.id = :id', { id })
      .limit(4)
      .orderBy('day-point.id', 'DESC')
      .getRawMany();

    return { ...day, lastRated };
  }

  increaseViews(id: number) {
    return this.dayRepository.increment({ id }, 'views', 1);
  }
}
