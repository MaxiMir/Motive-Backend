import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Topic } from 'src/topic/topic.entity';

@Entity('likes')
export class Like {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'unique identifier',
  })
  id: number;

  @ManyToOne(() => Topic, { nullable: false })
  @JoinColumn()
  topic: Topic;

  @RelationId((like: Like) => like.topic)
  topicId: number;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn()
  user: User;

  @RelationId((like: Like) => like.user)
  userId: number;

  @Index({ unique: true })
  @Column()
  @ApiProperty({
    example: '1:53',
    description: '{user.id}:{topic.id}',
  })
  uniq: string;
}
