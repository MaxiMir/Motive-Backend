import { ApiProperty } from '@nestjs/swagger';
import { PageDto } from './page.dto';
import { RatingContentDto } from './rating-content.dto';

export class RatingDto extends PageDto {
  @ApiProperty()
  content: RatingContentDto;
}
