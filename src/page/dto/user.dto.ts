import { ApiProperty } from '@nestjs/swagger';
import { PageDto } from './page.dto';
import { UserPageContent } from './user-content.dto';

export class UserDto extends PageDto {
  @ApiProperty()
  content: UserPageContent;
}
