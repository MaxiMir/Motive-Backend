import { ApiProperty } from '@nestjs/swagger';
import { SearchContentDto } from './search-content.dto';

export class SearchDto {
  @ApiProperty()
  readonly content: SearchContentDto;
}
