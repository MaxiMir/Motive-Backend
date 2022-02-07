import { ApiHideProperty, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Goal } from 'src/goal/goal.entity';
import { Task } from 'src/task/task.entity';
import { DayCharacteristic } from 'src/day-characteristic/day-characteristic.entity';
import { Feedback } from 'src/feedback/feedback.entity';
import { Topic } from 'src/topic/topic.entity';
import { Reaction } from 'src/reaction/reaction.entity';

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

  @Column({ default: 0 })
  stage: number;

  @OneToOne(() => DayCharacteristic, (characteristic) => characteristic.day, {
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

  @OneToOne(() => Feedback, (feedback) => feedback.day, {
    eager: true,
  })
  @ApiProperty({ type: () => Feedback })
  @ApiHideProperty()
  feedback: Feedback;

  @OneToMany(() => Topic, (topic) => topic.day)
  @ApiPropertyOptional({ type: () => Topic, isArray: true })
  @ApiHideProperty()
  topics: Topic[];

  @Column({ default: 0 })
  @ApiProperty({
    example: 251,
  })
  topicCount: number;

  @OneToMany(() => Reaction, (reaction) => reaction.day, {
    cascade: true,
  })
  @ApiHideProperty()
  reactions: Reaction[];

  @ManyToOne(() => Goal, (goal) => goal.days, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @ApiHideProperty()
  goal: Goal;
}
