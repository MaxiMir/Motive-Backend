import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectLiteral, Repository } from 'typeorm';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { FindConditions } from 'typeorm/find-options/FindConditions';
import { Day } from './day.entity';

@Injectable()
export class DayService {
  constructor(
    @InjectRepository(Day)
    private readonly dayRepository: Repository<Day>,
  ) {}

  async findByPK(id: number, options?: FindOneOptions<Day>) {
    return await this.dayRepository.findOneOrFail({ id }, options);
  }

  async findLastAdd(where?: FindConditions<Day> | ObjectLiteral) {
    const [day] = await this.dayRepository.find({
      where,
      order: {
        id: 'DESC',
      },
      take: 1,
    });

    return day;
  }

  async incrementViews(id: number) {
    const day = await this.findByPK(id);
    day.views += 1;

    await this.dayRepository.save(day);
  }
}
