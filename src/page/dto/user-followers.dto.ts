import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/user.entity';
import { PageDto } from 'src/abstract/page.dto';

export class UserFollowersDto extends PageDto {
  @ApiProperty()
  content: User[];
}
