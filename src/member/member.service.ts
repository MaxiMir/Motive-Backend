import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { UserService } from 'src/user/user.service';
import { GoalService } from 'src/goal/goal.service';
import { DayService } from 'src/day/day.service';
import { GoalCharacteristic } from 'src/goal-characteristic/entities/goal-characteristic.entity';
import { CreateMemberDto } from './dto/create-member.dto';
import { Member } from './entities/member.entity';
import { UpdateMemberDto } from './dto/update-member.dto';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    private readonly userService: UserService,
    private readonly goalService: GoalService,
    private readonly dayService: DayService,
  ) {}

  findOne(options?: FindOneOptions<Member>) {
    return this.memberRepository.findOneOrFail(options);
  }

  async save(dto: CreateMemberDto, userId: number) {
    const member = new Member();
    member.uniq = this.getUniq(userId, dto.goalId);
    member.user = await this.userService.findByPK(userId);
    member.goal = await this.goalService.findByPK(dto.goalId);
    member.started = dto.started;
    member.day = dto.dayId
      ? await this.dayService.findByPK(dto.dayId)
      : await this.dayService.findOne({ where: { goal: dto.goalId } });

    return this.memberRepository.manager.transaction(async (transactionalManager) => {
      await transactionalManager.increment(GoalCharacteristic, { goal: member.goal.id }, 'members', 1);

      return transactionalManager.save(member);
    });
  }

  async update(id: number, dto: UpdateMemberDto, userId: number) {
    const member = await this.findOne({ where: { id, user: userId } });
    member.day = await this.dayService.findByPK(dto.dayId);
    member.lastEndOfDay = dto.lastEndOfDay;

    return this.memberRepository.save(member);
  }

  async delete(id: number, userId: number) {
    const member = await this.findOne({ where: { id, user: userId } });

    return this.memberRepository.manager.transaction(async (transactionalManager) => {
      await transactionalManager.decrement(GoalCharacteristic, { goal: member.goalId }, 'members', 1);
      await transactionalManager.remove(member);
    });
  }

  getUniq(userId: number, goalId: number) {
    return [userId, goalId].join(':');
  }
}
