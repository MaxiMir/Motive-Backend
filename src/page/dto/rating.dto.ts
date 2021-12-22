import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/user.entity';

export class RatingDto {
  @ApiProperty()
  content: {
    motivation: User[];
    creativity: User[];
    support: User[];
  };
}
