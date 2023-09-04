import { GoalEntity } from 'src/goal/entities/goal.entity';
import { CalendarDto } from 'src/goal/dto/calendar.dto';
import { MemberEntity } from 'src/member/entities/member.entity';
import { UserBaseEntity } from 'src/user/entities/user-base.entity';
import { DayDto } from 'src/day/dto/day.dto';

export class UserPageGoal extends GoalEntity {
  readonly member?: MemberEntity;
  readonly calendar: CalendarDto[];
  readonly day: DayDto;
  readonly lastMembers?: UserBaseEntity[];
}
