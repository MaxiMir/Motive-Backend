import { ApiProperty } from '@nestjs/swagger';
import { UserWithCharacteristicDto } from 'src/user/dto/user-with-characteristic.dto';

export class FollowingDto {
  @ApiProperty({ type: () => UserWithCharacteristicDto, isArray: true })
  readonly content: UserWithCharacteristicDto[];
}
