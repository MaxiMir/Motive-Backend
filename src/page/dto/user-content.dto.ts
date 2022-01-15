import { ApiProperty } from '@nestjs/swagger';
import { UserCharacteristic } from 'src/user-characteristic/user-characteristic.entity';
import { GoalWithCalendarDto } from 'src/goal/dto/goal-with-calendar.dto';

export class UserContentDto {
  @ApiProperty({ type: 'boolean' })
  isFollowing: boolean;

  @ApiProperty({ type: () => UserCharacteristic })
  characteristic: UserCharacteristic;

  @ApiProperty({ type: () => GoalWithCalendarDto, isArray: true })
  goals: GoalWithCalendarDto[];

  @ApiProperty({ type: () => GoalWithCalendarDto, isArray: true })
  goalsMember: GoalWithCalendarDto[];
}
