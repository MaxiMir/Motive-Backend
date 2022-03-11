import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { GoalService } from 'src/goal/goal.service';
import { DayService } from 'src/day/day.service';
import { Member } from './entities/member.entity';
import { CreateMemberDto } from './dto/create-member.dto';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    private readonly userService: UserService,
    private readonly goalService: GoalService,
    private readonly dayService: DayService,
  ) {}

  async save(dto: CreateMemberDto, userId: number) {
    const member = new Member();
    member.uniq = this.getUniq(userId, dto.goalId);
    member.user = await this.userService.findByPK(userId);
    member.goal = await this.goalService.findByPK(dto.goalId);
    member.day = await this.dayService.findByPK(dto.dayId);

    return this.memberRepository.save(member);
  }

  delete(id: number, userId: number) {
    return this.memberRepository.delete({ id, user: { id: userId } });
  }

  getUniq(userId: number, goalId: number) {
    return [userId, goalId].join(':');
  }
}
