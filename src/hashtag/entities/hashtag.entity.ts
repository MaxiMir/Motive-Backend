import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('hashtags')
export class Hashtag {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'unique identifier',
  })
  id: number;

  @Index({ unique: true })
  @Column()
  @ApiProperty({
    example: 'knowledge',
  })
  name: string;

  @Index()
  @Column({ default: 0 })
  @ApiProperty({
    example: 13242,
  })
  views: number;
}
