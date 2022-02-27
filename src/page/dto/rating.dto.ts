import { ApiProperty } from '@nestjs/swagger';
import { RatingContentDto } from './rating-content.dto';

export class RatingDto {
  @ApiProperty()
  readonly content: RatingContentDto;
}
