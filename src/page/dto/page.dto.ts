import { ApiProperty } from '@nestjs/swagger';
import { UserBaseDto } from 'src/user/dto/user-base.dto';

export class PageDto {
  @ApiProperty({ type: () => UserBaseDto })
  client: UserBaseDto;
}
