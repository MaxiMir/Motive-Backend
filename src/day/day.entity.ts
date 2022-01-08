import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Goal } from 'src/goal/goal.entity';
import { Task } from 'src/task/task.entity';
import { DayCharacteristic } from 'src/day-characteristic/day-characteristic.entity';

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
  date: Date;

  @OneToOne(() => DayCharacteristic, (characteristic) => characteristic.day, {
    eager: true,
    cascade: true,
  })
  @ApiProperty({ type: () => DayCharacteristic })
  characteristic: DayCharacteristic;

  @OneToMany(() => Task, (task) => task.day, {
    eager: true,
    cascade: true,
  })
  @ApiProperty({ type: () => Task, isArray: true })
  tasks: Task[];

  @Column({ default: 0 })
  @ApiProperty({
    example: 1433,
  })
  views: number;

  // discussion: string;

  // @Column({ nullable: false })
  // discussionId!: Discussion["id"]

  @Column({ default: 0 })
  @ApiProperty({
    example: 251,
  })
  discussionCount: number;

  // feedback: string;

  // @Column({ nullable: false })
  // feedbackId!: Feedback["id"]

  @ManyToOne(() => Goal, (goal) => goal.days, {
    onDelete: 'CASCADE',
  })
  goal: Goal;
}
