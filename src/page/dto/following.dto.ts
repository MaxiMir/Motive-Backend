import { ApiProperty } from '@nestjs/swagger';
import { UserWithCharacteristicDto } from 'src/user/dto/user-with-characteristic.dto';
import { PageDto } from './page.dto';

export class FollowingDto extends PageDto {
  @ApiProperty({ type: () => UserWithCharacteristicDto, isArray: true })
  readonly content: UserWithCharacteristicDto[];
}
