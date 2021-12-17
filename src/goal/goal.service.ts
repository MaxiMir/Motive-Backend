import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Goal } from './goal.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GoalService {
  constructor(
    @InjectRepository(Goal)
    private readonly goalRepository: Repository<Goal>,
  ) {}

  async findByPK(id: number) {
    return await this.goalRepository.findOneOrFail({ id });
  }

  async save(goal: Goal) {
    return await this.goalRepository.save(goal);
  }
}
