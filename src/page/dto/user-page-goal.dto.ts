import { GoalEntity } from 'src/goal/entities/goal.entity';
import { DayEntity } from 'src/day/entities/day.entity';
import { CalendarDto } from 'src/goal/dto/calendar.dto';

export class UserPageGoal extends GoalEntity {
  readonly member: boolean;
  readonly calendar: CalendarDto[];
  readonly day: DayEntity;
}
