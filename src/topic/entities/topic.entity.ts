import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';
import { Day } from 'src/day/entities/day.entity';
import { User } from 'src/user/entities/user.entity';
import { TopicTypeDto } from 'src/topic/dto/topic-type.dto';

@Entity('topics')
export class Topic {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'unique identifier',
  })
  id: number;

  @Column({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @ApiProperty({
    example: '2022-02-16 00:00:00+03',
    description: 'created message',
  })
  date: string;

  @Column({ default: 0 })
  @ApiProperty({
    example: 13,
  })
  likeCount: number;

  @Column({ type: 'text' })
  @ApiProperty({
    example: 'What other books have you read?',
  })
  text: string;

  @ManyToOne(() => User, { eager: true, nullable: false })
  user: User;

  @RelationId((topic: Topic) => topic.user)
  userId: number;

  @Column({
    type: 'enum',
    enum: TopicTypeDto,
    nullable: false,
  })
  type: TopicTypeDto;

  @OneToOne(() => Topic, {
    cascade: true,
  })
  @JoinColumn()
  answer: Topic;

  @Column({ nullable: true })
  parentId: number;

  @Column()
  goalId: number;

  @ManyToOne(() => Day, { cascade: true, nullable: false })
  day: Day;

  @RelationId((topic: Topic) => topic.day)
  dayId: number;

  @Column('boolean', { nullable: true, default: false })
  @ApiProperty({
    example: true,
  })
  edited: boolean;
}
