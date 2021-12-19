import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/user.entity';

export class FavoritesPageDto {
  @ApiProperty({ type: () => User, isArray: true })
  content: User[];
}
