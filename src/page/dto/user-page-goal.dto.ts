import { Goal } from 'src/goal/entities/goal.entity';
import { Characteristic } from 'src/abstracts/characteristic';
import { Day } from 'src/day/entities/day.entity';
import { CalendarDto } from 'src/goal/dto/calendar.dto';

export class UserPageGoal extends Goal {
  inherited: boolean;
  calendar: CalendarDto[];
  reactions: Record<Characteristic, number[]>;
  day: Day;
}
