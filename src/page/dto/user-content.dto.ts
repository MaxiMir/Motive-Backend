import { ApiProperty } from '@nestjs/swagger';
import { UserCharacteristic } from 'src/user-characteristic/entities/user-characteristic.entity';
import { UserPageGoal } from './user-page-goal.dto';

export class UserContentDto {
  @ApiProperty({ type: 'boolean' })
  readonly following: boolean;

  @ApiProperty({ type: () => UserCharacteristic })
  readonly characteristic: UserCharacteristic;

  @ApiProperty({ type: () => UserPageGoal, isArray: true })
  readonly goals: UserPageGoal[];

  @ApiProperty({ type: () => UserPageGoal, isArray: true })
  readonly goalsMember: UserPageGoal[];
}
