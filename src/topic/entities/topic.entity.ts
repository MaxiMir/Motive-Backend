import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';
import { DayEntity } from 'src/day/entities/day.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { TopicTypeDto } from 'src/topic/dto/topic-type.dto';

@Entity('topics')
export class TopicEntity {
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

  @ManyToOne(() => UserEntity, { cascade: true, eager: true, nullable: false })
  user: UserEntity;

  @RelationId((topic: TopicEntity) => topic.user)
  userId: number;

  @Column({
    type: 'enum',
    enum: TopicTypeDto,
    nullable: false,
  })
  type: TopicTypeDto;

  @OneToOne(() => TopicEntity, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  answer: TopicEntity;

  @Column({ nullable: true })
  parentId: number;

  @Column()
  goalId: number;

  @ManyToOne(() => DayEntity, { cascade: true, nullable: false, onDelete: 'CASCADE' })
  day: DayEntity;

  @RelationId((topic: TopicEntity) => topic.day)
  dayId: number;

  @Column('boolean', { default: false })
  @ApiProperty({
    example: true,
    description: 'changed by user',
  })
  edited = false;
}
