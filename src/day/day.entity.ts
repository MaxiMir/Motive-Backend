import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AfterLoad, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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

  @OneToMany(() => Task, (task) => task.day, {
    eager: true,
    cascade: true,
  })
  @ApiPropertyOptional({ type: () => Task, isArray: true })
  tasks: Task[];

  @Column({ default: 0 })
  @ApiProperty({
    example: 1433,
    description: 'day views',
  })
  views: number;

  @AfterLoad()
  updateCounters() {
    this.views += 1;
  }

  // discussion: string;

  // discussionCount: number;

  // feedback: string;

  @ManyToOne(() => Goal, (goal) => goal.days)
  @ApiProperty({ type: () => Goal })
  goal: Goal;
}
