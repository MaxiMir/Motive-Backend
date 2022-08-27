import { IsEnum, IsOptional, IsString } from 'class-validator';
import { SearchTypeDto } from './search-type.dto';

export class SearchParamsDto {
  @IsOptional()
  @IsString()
  readonly q?: string;

  @IsOptional()
  @IsEnum(SearchTypeDto)
  readonly type?: SearchTypeDto;
}
