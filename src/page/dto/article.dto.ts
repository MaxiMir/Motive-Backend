import { ApiProperty } from '@nestjs/swagger';
import { ArticleEntity } from 'src/article/entities/article.entity';

export class ArticleDto extends ArticleEntity {
  @ApiProperty({
    example: 'Developing emotional intelligence',
    description: 'meta',
  })
  readonly title: string;

  @ApiProperty({
    example: 'Unleash the power of empathy and emotional intelligence',
    description: 'meta',
  })
  readonly description: string;

  @ApiProperty({
    example: 'Developing emotional intelligence',
    description: 'meta',
  })
  readonly header: string;

  @ApiProperty({
    example: 'Empathy empowers: enhance relationships, transform lives!',
  })
  readonly motto: string;

  @ApiProperty({
    example: 'psychology',
  })
  readonly tag: string;

  @ApiProperty({
    example: "In today's fast-paced world, it's easy to lose sight of the value of human connections",
  })
  readonly content: string;
}
