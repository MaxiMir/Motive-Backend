import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Day } from './day.entity';

@Injectable()
export class DayService {
  constructor(
    @InjectRepository(Day)
    private dayRepository: Repository<Day>,
  ) {}

  async findOne(id: number) {
    return await this.dayRepository.find({ id });
  }
}
