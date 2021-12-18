import { User } from 'src/user/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UserPageDto {
  @ApiProperty()
  content: User;
}
