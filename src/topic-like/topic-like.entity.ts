import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/user.entity';
import { Topic } from 'src/topic/topic.entity';

@Entity('topic-likes')
export class TopicLike {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'unique identifier',
  })
  id: number;

  @ManyToOne(() => Topic, { nullable: false })
  @JoinColumn()
  topic: Topic;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn()
  user: User;
}
