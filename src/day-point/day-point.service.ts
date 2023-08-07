import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DayPointEntity } from './entities/day-point.entity';

@Injectable()
export class DayPointService {
  constructor(
    @InjectRepository(DayPointEntity)
    private readonly reactionRepository: Repository<DayPointEntity>,
  ) {}

  getRepository() {
    return this.reactionRepository;
  }
}
