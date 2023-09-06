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

    return this.dayPointRepository
      .createQueryBuilder('day-point')
      .leftJoinAndSelect('day-point.user', 'user')
      .select(['user.id as id', 'user.nickname as nickname', 'user.name as name', 'user.avatar as avatar'])
      .where(where)
      .take(take)
      .skip(skip)
      .orderBy('day-point.id', 'DESC')
      .getRawMany();
  }
}
