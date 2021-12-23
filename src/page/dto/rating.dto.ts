import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/user.entity';
import { PageDto } from 'src/abstract/page.dto';

export class RatingDto extends PageDto {
  @ApiProperty()
  content: {
    motivation: User[];
    creativity: User[];
    support: User[];
  };
}
