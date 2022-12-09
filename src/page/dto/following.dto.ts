import { ApiProperty } from '@nestjs/swagger';
import { UserWithCharacteristicEntity } from 'src/user/entities/user-with-characteristic.entity';

export class FollowingDto {
  @ApiProperty({ type: () => UserWithCharacteristicEntity, isArray: true })
  readonly following: UserWithCharacteristicEntity[];
}
