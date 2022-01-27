import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Day } from 'src/day/day.entity';
import { User } from 'src/user/user.entity';
import { TopicDirectory } from 'src/abstracts/topicDictionary';

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
    example: '2021-08-15 21:05:15.723336+07',
    description: 'created message',
  })
  date: string;

  @Column({ type: 'text' })
  @ApiProperty({
    example: 'What other books have you read?',
  })
  message: string;

  @Column('int', { array: true })
  @ApiProperty({
    example: [23, 33],
    description: 'user id list',
  })
  likes: number[] = [];

  @Column({
    type: 'enum',
    enum: TopicDirectory,
  })
  type: TopicDirectory;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Day, { cascade: true, nullable: false })
  day: Day;
}
