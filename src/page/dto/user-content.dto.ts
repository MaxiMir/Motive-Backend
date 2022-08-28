import { ApiProperty } from '@nestjs/swagger';
import { UserCharacteristicEntity } from 'src/user-characteristic/entities/user-characteristic.entity';
import { UserBaseEntity } from 'src/user/entities/user-base.entity';
import { MemberEntity } from 'src/member/entities/member.entity';
import { ConfirmationEntity } from 'src/confirmation/entities/confirmation.entity';
import { UserPageGoal } from './user-page-goal.dto';

export class UserContentDto extends UserBaseEntity {
  @ApiProperty({ type: 'boolean' })
  readonly following: boolean;

  @ApiProperty({ type: () => UserCharacteristicEntity })
  readonly characteristic: UserCharacteristicEntity;

  @ApiProperty({ type: () => UserPageGoal, isArray: true })
  readonly goals: UserPageGoal[];

  @ApiProperty({ type: () => MemberEntity, isArray: true })
  readonly userMembership: MemberEntity[];

  @ApiProperty({ type: () => MemberEntity, isArray: true })
  readonly clientMembership: MemberEntity[];

  @ApiProperty({ type: () => ConfirmationEntity, isArray: true })
  readonly confirmations: ConfirmationEntity[];
}
