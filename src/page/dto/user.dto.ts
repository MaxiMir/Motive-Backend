import { ApiProperty } from '@nestjs/swagger';
import { PageDto } from './page.dto';
import { UserContentDto } from './user-content.dto';

export class UserDto extends PageDto {
  @ApiProperty()
  readonly content: UserContentDto;
}
