import { MetaDto } from './meta.dto';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/user.entity';

export class PageDto {
  @ApiProperty()
  meta: MetaDto;
  client: User;
}
