import { ApiProperty } from '@nestjs/swagger';
import { UserContentDto } from './user-content.dto';

export class UserDto {
  @ApiProperty()
  readonly content: UserContentDto;
}
