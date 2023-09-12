import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { MemberService } from 'src/member/member.service';
import { GoalEntity } from 'src/goal/entities/goal.entity';
import { TaskEntity } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
    private readonly memberService: MemberService,
  ) {}

  findByPK(id: number, options?: FindOneOptions<TaskEntity>) {
    return this.taskRepository.findOneOrFail({ id }, options);
  }

  async updateCompleted(id: number, userId: number) {
    const task = await this.findByPK(id, { relations: ['day'] });
    const isMember = task.userId !== userId;
    const member = !isMember ? null : await this.memberService.findOne({ where: { user: userId } });
    const updateTask = !isMember || !task.completedByOthers;
    const updateMember = member && !member.completedTasks.includes(id);

    return this.taskRepository.manager.transaction(async (transactionalManager) => {
      if (!isMember) {
        await transactionalManager
          .createQueryBuilder()
          .update(GoalEntity)
          .set({ points: () => 'points + 1', pointsTasks: () => '"pointsTasks" + 1' })
          .where('id = :id', { id: task.day.goalId })
          .execute();
      }

      if (updateTask) {
        task.completed = !isMember ? true : task.completed;
        task.completedByOthers = true;
        await transactionalManager.save(task);
      }

      if (updateMember) {
        member.completedTasks.push(id);
        await transactionalManager.save(member);
      }
    });
  }
}
