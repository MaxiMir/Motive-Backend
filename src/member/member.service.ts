import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Raw, Repository } from 'typeorm';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { UserService } from 'src/user/user.service';
import { GoalService } from 'src/goal/goal.service';
import { DayService } from 'src/day/day.service';
import { GoalCharacteristic } from 'src/goal-characteristic/entities/goal-characteristic.entity';
import { UserCharacteristic } from 'src/user-characteristic/entities/user-characteristic.entity';
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

  @Cron('00 30 03 * * *')
  async handleCron() {
    const members = await this.memberRepository.find({
      relations: ['user'],
      where: {
        updated: Raw((alias) => `${alias} < CURRENT_DATE - ${process.env.EAT_AFTER_DAYS}`),
      },
    });

    if (!members.length) return;

    const users = members.map((m) => m.user.id);
    const goals = members.map((m) => m.goalId);
    const goalsCount = goals.reduce<Map<number, number>>(
      (acc, id) => acc.set(id, 1 + (acc.get(id) || 0)),
      new Map(),
    );
    const multipleGoalsCount = Object.entries(Object.fromEntries(goalsCount)).filter(([, v]) => v > 1);

    return this.memberRepository.manager.transaction(async (transactionalManager) => {
      await transactionalManager.decrement(GoalCharacteristic, { id: In(goals) }, 'members', 1);
      await Promise.all(
        multipleGoalsCount.map(([id, value]) =>
          transactionalManager.decrement(GoalCharacteristic, { id: Number(id) }, 'members', value - 1),
        ),
      );
      await transactionalManager.increment(UserCharacteristic, { user: In(users) }, 'abandoned', 1);
      await transactionalManager.remove(members);
    });
  }

  findOne(options?: FindOneOptions<Member>) {
    return this.memberRepository.findOneOrFail(options);
  }

  async save(dto: CreateMemberDto, userId: number) {
    const member = new Member();
    member.uniq = this.getUniq(userId, dto.goalId);
    member.user = await this.userService.findByPK(userId);
    member.goal = await this.goalService.findByPK(dto.goalId);
    member.started = dto.started;
    member.updated = dto.started;
    member.day = dto.dayId
      ? await this.dayService.findByPK(dto.dayId)
      : await this.dayService.findOne({ where: { goal: dto.goalId }, order: { id: 'ASC' } });

    return this.memberRepository.manager.transaction(async (transactionalManager) => {
      await transactionalManager.increment(GoalCharacteristic, { goal: member.goal.id }, 'members', 1);

      return transactionalManager.save(member);
    });
  }

  async update(id: number, dto: UpdateMemberDto, userId: number) {
    const member = await this.findOne({ where: { id, user: userId } });
    member.day = await this.dayService.findByPK(dto.dayId);
    member.updated = dto.updated;

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
