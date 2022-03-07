import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Goal } from 'src/goal/entities/goal.entity';
import { Day } from 'src/day/entities/day.entity';

@Entity('members')
export class Member {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'unique identifier',
  })
  id: number;

  @ManyToOne(() => Goal, { nullable: false })
  @JoinColumn()
  goal: Goal;

  @RelationId((member: Member) => member.goal)
  goalId: number;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn()
  user: User;

  @RelationId((member: Member) => member.user)
  userId: number;

  @OneToOne(() => Day, { nullable: false })
  @JoinColumn()
  day: Day;

  @RelationId((member: Member) => member.day)
  dayId: number;

  @Column('int', { array: true })
  @ApiProperty({
    example: [23, 33],
    description: 'user id list',
  })
  completed: number[] = [];

  @Index({ unique: true })
  @Column()
  @ApiProperty({
    example: '1:53',
    description: '{user.id}:{topic.id}',
  })
  uniq: string;
}
