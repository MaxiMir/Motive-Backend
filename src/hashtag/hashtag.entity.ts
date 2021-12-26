import { Column, Entity, Index, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
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
  })
  name: string;

  @Column({ default: 0 })
  @ApiProperty({
    example: 13242,
  })
  views: number;

  @ManyToMany(() => Goal, (goal) => goal.hashtags)
  @JoinTable()
  goal: Goal;
}
