import { ApiProperty } from '@nestjs/swagger';
import { BlogEntity } from 'src/blog/entities/blog.entity';

export class BlogDto {
  @ApiProperty({ type: () => BlogEntity, isArray: true })
  readonly articles: BlogEntity[];
}
