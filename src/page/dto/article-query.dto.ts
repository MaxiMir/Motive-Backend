import { IsEnum, IsOptional, IsString } from 'class-validator';
import { LocaleDto, LOCALES } from 'src/common/locale.dto';

export class ArticleQueryDto {
  @IsOptional()
  @IsString()
  readonly share?: string;

  @IsEnum(LOCALES)
  readonly locale: LocaleDto;
}
