import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/user.entity';

export class UserPageContent {
  @ApiProperty({ type: 'boolean' })
  isFollowing: boolean;

  @ApiProperty({ type: () => User })
  user: User;
}
