import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/user.entity';

export class UserFollowersDto {
  @ApiProperty()
  content: User[];
}
