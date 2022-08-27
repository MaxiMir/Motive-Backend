import { GoalEntity } from 'src/goal/entities/goal.entity';
import { CharacteristicDto } from 'src/common/characteristic.dto';
import { DayEntity } from 'src/day/entities/day.entity';
import { CalendarDto } from 'src/goal/dto/calendar.dto';

export class UserPageGoal extends GoalEntity {
  readonly inherited: boolean;
  readonly calendar: CalendarDto[];
  readonly reactions: Record<CharacteristicDto, number[]>;
  readonly day: DayEntity;
}
