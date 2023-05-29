import { IsEnum, IsOptional, IsString } from 'class-validator';
import { LocaleDto, LOCALES } from 'src/locale/dto/locale.dto';

export class ArticleQueryDto {
  @IsOptional()
  @IsString()
  readonly share?: string;

  @IsEnum(LOCALES)
  readonly locale: LocaleDto;
}
