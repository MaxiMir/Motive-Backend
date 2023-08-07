import { ApiHideProperty, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';
import { GoalEntity } from 'src/goal/entities/goal.entity';
import { TaskEntity } from 'src/task/entities/task.entity';
import { FeedbackEntity } from 'src/feedback/entities/feedback.entity';
import { TopicEntity } from 'src/topic/entities/topic.entity';
import { DayPointEntity } from 'src/day-point/entities/day-point.entity';

@Entity('days')
export class DayEntity {
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

  @OneToMany(() => TaskEntity, (task) => task.day, {
    cascade: true,
  })
  @ApiProperty({ type: () => TaskEntity, isArray: true })
  tasks: TaskEntity[];

  @Column({ default: 0 })
  @ApiProperty({
    example: 1541,
    description: 'day points',
  })
  points: number;

  @Column({ default: 0 })
  @ApiProperty({
    example: 1541,
    description: 'rated by users',
  })
  pointsRated: number;

  @Column({ default: 0 })
  @ApiProperty({
    example: 1433,
  })
  views: number;

  @OneToOne(() => FeedbackEntity, (feedback) => feedback.day, {
    onDelete: 'CASCADE',
  })
  @ApiProperty({ type: () => FeedbackEntity })
  @ApiHideProperty()
  feedback: FeedbackEntity;

  @OneToMany(() => TopicEntity, (topic) => topic.day, {
    onDelete: 'CASCADE',
  })
  @ApiPropertyOptional({ type: () => TopicEntity, isArray: true })
  @ApiHideProperty()
  topics: TopicEntity[];

  @Column({ default: 0 })
  @ApiProperty({
    example: 251,
  })
  topicCount: number;

  @OneToMany(() => DayPointEntity, (point) => point.day, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @ApiHideProperty()
  likes: DayPointEntity[];

  @ManyToOne(() => GoalEntity, (goal) => goal.days, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @ApiHideProperty()
  goal: GoalEntity;

  @RelationId((day: DayEntity) => day.goal)
  goalId: number;
}
