import { ApiProperty } from '@nestjs/swagger';
import { PageDto } from './page.dto';
import { User } from 'src/user/user.entity';

export class UserPageDto extends PageDto {
  @ApiProperty()
  content: User;
}
