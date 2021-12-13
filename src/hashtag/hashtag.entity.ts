import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Goal } from 'src/goal/goal.entity';

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
    description: 'name',
  })
  name: string;

  @Column({ default: 0 })
  @ApiProperty({
    example: 13242,
    description: 'views',
  })
  views: number;

  @ManyToOne(() => Goal, (goal) => goal.hashtags)
  @ApiProperty({ type: () => Goal })
  goal: Promise<Goal>;
}
