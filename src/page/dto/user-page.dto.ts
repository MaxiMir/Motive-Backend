import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/user.entity';
import { PageDto } from 'src/abstract/page.dto';

export class UserPageDto extends PageDto {
  @ApiProperty()
  content: {
    favorite: boolean;
    user: User;
  };
}
