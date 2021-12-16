import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Day } from './day.entity';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';

@Injectable()
export class DayService {
  constructor(
    @InjectRepository(Day)
    private readonly dayRepository: Repository<Day>,
  ) {}

  async findOne(id: number, options?: FindOneOptions<Day>) {
    return await this.dayRepository.findOneOrFail({ id }, options);
  }

  async findLast(goalId: number) {
    const [day] = await this.dayRepository.find({
      where: { goal: goalId },
      order: {
        id: 'DESC',
      },
      take: 1,
    });

    return day;
  }
}
