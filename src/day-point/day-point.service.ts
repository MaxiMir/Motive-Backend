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

  async find(query: FindQueryDto) {
    const { where, take, skip } = query;

    const dayPoints = await this.dayPointRepository.find({
      order: {
        id: 'DESC',
      },
      relations: ['user', 'user.characteristic'],
      where,
      take,
      skip,
    });

    return dayPoints.map((d) => d.user);
  }
}
