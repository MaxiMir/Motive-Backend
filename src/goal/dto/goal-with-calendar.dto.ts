import { Goal } from 'src/goal/goal.entity';
import { CalendarDto } from './calendar.dto';

export class GoalWithCalendarDto extends Goal {
  calendar: CalendarDto[];
}
