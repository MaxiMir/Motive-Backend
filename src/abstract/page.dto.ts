import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/user.entity';

export class PageDto {
  @ApiProperty({ type: () => User })
  client: User;
}
