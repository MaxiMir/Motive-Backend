import { ApiProperty } from '@nestjs/swagger';
import { ArticleDto } from './article.dto';

export class BlogDto {
  @ApiProperty({ type: () => ArticleDto, isArray: true })
  readonly articles: ArticleDto[];
}
