import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindQueryDto } from './dto/find-query.dto';
import { DayPointEntity } from './entities/day-point.entity';

@Injectable()
export class DayPointService {
  constructor(
    @InjectRepository(DayPointEntity)
    private readonly dayPointRepository: Repository<DayPointEntity>,
  ) {}

  getRepository() {
    return this.dayPointRepository;
  }

  find(query: FindQueryDto) {
    const { where, take, skip } = query;

    return this.dayPointRepository.find({
      relations: ['user', 'user.characteristic'],
      order: {
        id: 'DESC',
      },
      where,
      take,
      skip,
    });
  }
}
