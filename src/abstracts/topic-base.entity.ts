import { Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/user.entity';

export enum TopicDirectory {
  QUESTION = 'question',
  SUPPORT = 'support',
}

export class TopicBase {
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
  text: string;

  @Column('int', { array: true })
  @ApiProperty({
    example: [23, 33],
    description: 'user id list',
  })
  likes: number[] = [];

  @ManyToOne(() => User, { eager: true, nullable: false })
  user: User;
}
