import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Goal } from './goal.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GoalService extends TypeOrmCrudService<Goal> {
  constructor(
    @InjectRepository(Goal)
    private goalRepository: Repository<Goal>,
  ) {
    super(goalRepository);
  }
}
