import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  findByPK(id: number, options?: FindOneOptions<Task>) {
    return this.taskRepository.findOneOrFail({ id }, options);
  }

  async updateCompleted(id: number) {
    const task = await this.findByPK(id);
    task.completed = true;

    return this.taskRepository.save(task);
  }
}
