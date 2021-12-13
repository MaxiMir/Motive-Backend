import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Goal } from 'src/goal/goal.entity';
import { Task } from 'src/task/task.entity';

@Entity('days')
export class Day {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'unique identifier',
  })
  id: number;

  @Column({ type: 'timestamp with time zone', default: () => "'TOMORROW'" })
  @ApiProperty({
    example: '2021-08-15 00:00:00.000000+07',
    description: 'day date',
  })
  date: string;

  tasks: Task[];

  // discussion: string;

  // discussionCount: number;

  // feedback: string;

  @ManyToOne(() => Goal, (goal) => goal.days)
  @ApiProperty({ type: () => Goal })
  goal: Promise<Goal>;
}
