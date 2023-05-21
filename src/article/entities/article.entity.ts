import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { LocaleContentDto } from 'src/article/dto/locale-content.dto';

@Entity('articles')
export class ArticleEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'unique identifier',
  })
  id: number;

  @Column({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @ApiProperty({
    example: '2022-02-16 00:00:00+03',
    description: 'created message',
  })
  date: string;

  @Index({ unique: true })
  @Column()
  @ApiProperty({
    example: 'developing-emotional-intelligence',
  })
  pathname: string;

  @Column({ type: 'text' })
  @ApiProperty({
    example: '/static/blog/developing-emotional-intelligence.webp',
  })
  image: string;

  @Column({ default: 0 })
  @ApiProperty({
    example: 1500,
  })
  views: number;

  @Column({ default: 0 })
  @ApiProperty({
    example: 12,
  })
  sharesCount: number;

  @Column({ default: 0 })
  @ApiProperty({
    example: 251,
  })
  likeCount: number;

  @Column({ default: 0 })
  @ApiProperty({
    example: 12,
  })
  bookmarkedCount: number;

  @Column('simple-json', { select: false, nullable: true })
  @ApiProperty({
    example: "In today's fast-paced world...",
  })
  en: LocaleContentDto;

  @Column('simple-json', { select: false, nullable: true })
  @ApiProperty({
    example: 'В сегодняшнем быстром мире...',
  })
  ru: LocaleContentDto;

  @Column('simple-json', { select: false, nullable: true })
  @ApiProperty({
    example: 'У сьогоднішньому швидкому світі...',
  })
  uk: LocaleContentDto;

  @Column('simple-json', { select: false, nullable: true })
  @ApiProperty({
    example: '在今天这个快节奏的世界里...',
  })
  'zh-CN': LocaleContentDto;
}
