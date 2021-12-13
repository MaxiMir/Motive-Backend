import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/user/user.entity';

@Entity('goals')
export class Goal {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'unique identifier',
  })
  id: number;

  @Column()
  @ApiProperty({
    example: 'Learn English',
    description: 'name',
  })
  name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({
    example: '2021-08-15 21:05:15.723336+07',
    description: 'created date',
  })
  started: string;

  @Column('simple-array')
  @ApiProperty({
    example: [
      'foreignLanguage',
      'knowledge',
      'learnFrench',
      'immigration',
      'recommendation',
    ],
    description: 'hashtags',
  })
  hashtags: string[];

  @ManyToOne(() => User, (user) => user.goals)
  @JoinColumn()
  @ApiProperty({ type: () => User })
  user: User;
}
