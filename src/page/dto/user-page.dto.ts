import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/user.entity';

export class UserPageDto {
  @ApiProperty()
  content: {
    favorite: boolean;
    user: User;
  };
}
