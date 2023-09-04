import { DayEntity } from 'src/day/entities/day.entity';
import { UserBaseEntity } from 'src/user/entities/user-base.entity';

export class DayDto extends DayEntity {
  readonly lastRated?: UserBaseEntity;
}
