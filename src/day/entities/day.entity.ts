import { ApiHideProperty, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';
import { Goal } from 'src/goal/entities/goal.entity';
import { Task } from 'src/task/entities/task.entity';
import { DayCharacteristic } from 'src/day-characteristic/entities/day-characteristic.entity';
import { Feedback } from 'src/feedback/entities/feedback.entity';
import { Topic } from 'src/topic/entities/topic.entity';
import { Reaction } from 'src/reaction/entities/reaction.entity';

@Entity('days')
export class Day {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'unique identifier',
  })
  id: number;

  @Column({
    type: 'timestamp with time zone',
    default: () => "'TOMORROW'",
  })
  @ApiProperty({
    example: '2022-02-15 00:00:00+03',
    description: 'day date',
  })
  date: string;

  @Column({ default: 0 })
  stage: number;

  @OneToOne(() => DayCharacteristic, (characteristic) => characteristic.day, {
    cascade: true,
  })
  @ApiProperty({ type: () => DayCharacteristic })
  characteristic: DayCharacteristic;

  @OneToMany(() => Task, (task) => task.day, {
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
    onDelete: 'CASCADE',
  })
  @ApiProperty({ type: () => Feedback })
  @ApiHideProperty()
  feedback: Feedback;

  @OneToMany(() => Topic, (topic) => topic.day, {
    onDelete: 'CASCADE',
  })
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
    onDelete: 'CASCADE',
  })
  @ApiHideProperty()
  reactions: Reaction[];

  @ManyToOne(() => Goal, (goal) => goal.days, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @ApiHideProperty()
  goal: Goal;

  @RelationId((day: Day) => day.goal)
  goalId: number;
}
