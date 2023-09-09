import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { TopicEntity } from 'src/topic/entities/topic.entity';

@Entity('topic-likes')
export class TopicLikeEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'unique identifier',
  })
  id: number;

  @Index({ unique: true })
  @Column({ select: false })
  @ApiProperty({
    example: '1:53',
    description: '{user.id}:{topic.id}',
  })
  uniq: string;

  @ManyToOne(() => TopicEntity, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn()
  topic: TopicEntity;

  @RelationId((like: TopicLikeEntity) => like.topic)
  topicId: number;

  @ManyToOne(() => UserEntity, { nullable: false })
  @JoinColumn()
  user: UserEntity;

  @RelationId((like: TopicLikeEntity) => like.user)
  userId: number;
}
