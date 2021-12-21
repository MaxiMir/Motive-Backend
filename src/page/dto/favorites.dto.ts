import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/user.entity';

export class FavoritesDto {
  @ApiProperty({ type: () => User, isArray: true })
  content: User[];
}
