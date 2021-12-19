import { ApiProperty } from '@nestjs/swagger';
import { AfterLoad, Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
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
  date: string;

  @OneToOne(() => DayCharacteristic, (characteristic) => characteristic.day, {
    eager: true,
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

  @AfterLoad()
  updateCounters() {
    this.views += 1; // TODO if auth & not owner
  }

  // discussion: string;

  @Column({ default: 0 })
  @ApiProperty({
    example: 251,
  })
  discussionCount: number;

  // feedback: string;

  @ManyToOne(() => Goal, (goal) => goal.days)
  @ApiProperty({ type: () => Goal })
  goal: Goal;
}
