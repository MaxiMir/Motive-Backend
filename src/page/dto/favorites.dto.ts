import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/user.entity';
import { PageDto } from 'src/abstract/page.dto';

export class FavoritesDto extends PageDto {
  @ApiProperty({ type: () => User, isArray: true })
  content: User[];
}
