import { ApiProperty } from '@nestjs/swagger';
import { UserCharacteristic } from 'src/user-characteristic/user-characteristic.entity';
import { Day } from 'src/day/day.entity';

export class UserContentDto {
  @ApiProperty({ type: 'boolean' })
  isFollowing: boolean;

  @ApiProperty({ type: () => UserCharacteristic })
  characteristic: UserCharacteristic;

  @ApiProperty({ type: () => Day, isArray: true })
  goals: Day[];

  @ApiProperty({ type: () => Day, isArray: true })
  goalsMember: Day[];
}
