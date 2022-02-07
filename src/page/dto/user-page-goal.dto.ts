import { Goal } from 'src/goal/goal.entity';
import { Characteristic } from 'src/abstracts/characteristic';
import { Day } from 'src/day/day.entity';
import { CalendarDto } from 'src/goal/dto/calendar.dto';

export class UserPageGoal extends Goal {
  calendar: CalendarDto[];
  reactions: Record<Characteristic, number[]>;
  day: Day;
}
