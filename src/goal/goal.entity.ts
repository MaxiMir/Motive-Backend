import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/user/user.entity';

@Entity('goals')
export class Goal {
  @ApiProperty({
    example: 1,
    description: 'unique identifier',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Learn English',
    description: 'name',
  })
  @Column()
  name: string;

  @ApiProperty({
    example: '2021-08-15 21:05:15.723336+07',
    description: 'created date',
  })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  started: string;

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
  @Column('simple-array')
  hashtags: string[];

  @ManyToOne(() => User, (user) => user.goals)
  user: User;
}
