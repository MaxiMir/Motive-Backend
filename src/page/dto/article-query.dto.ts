import { IsEnum, IsOptional, IsString } from 'class-validator';
import { LocaleDto } from 'src/common/locale.dto';

export class ArticleQueryDto {
  @IsOptional()
  @IsString()
  readonly share?: string;

  @IsEnum(LocaleDto)
  readonly locale: LocaleDto;
}
