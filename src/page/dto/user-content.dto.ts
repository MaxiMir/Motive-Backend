import { ApiProperty } from '@nestjs/swagger';
import { UserCharacteristic } from 'src/user-characteristic/entities/user-characteristic.entity';
import { UserBaseDto } from 'src/user/dto/user-base.dto';
import { Member } from 'src/member/entities/member.entity';
import { UserPageGoal } from './user-page-goal.dto';

export class UserContentDto extends UserBaseDto {
  @ApiProperty({ type: 'boolean' })
  readonly following: boolean;

  @ApiProperty({ type: () => UserCharacteristic })
  readonly characteristic: UserCharacteristic;

  @ApiProperty({ type: () => UserPageGoal, isArray: true })
  readonly goals: UserPageGoal[];

  @ApiProperty({ type: () => Member, isArray: true })
  readonly userMembership: Member[];

  @ApiProperty({ type: () => Member, isArray: true })
  readonly clientMembership: Member[];
}
