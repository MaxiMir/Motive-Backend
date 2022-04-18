import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';
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

  @Index({ unique: true })
  @Column()
  @ApiProperty({
    example: '1:53',
    description: '{user.id}:{goal.id}',
  })
  uniq: string;

  @Column({
    type: 'timestamp with time zone',
    default: () => "'TODAY'",
  })
  @ApiProperty({
    example: '2022-02-16 00:00:00+03',
  })
  started: string;

  @Column('int', { array: true })
  @ApiProperty({
    example: [23, 33],
    description: 'completed tasks id list',
  })
  completedTasks: number[] = [];

  @Column({
    type: 'timestamp with time zone',
    default: () => "'TODAY'",
  })
  @ApiProperty({
    example: '2022-02-16 00:00:00+03',
  })
  updated: string;

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

  @ManyToOne(() => Day, { nullable: false })
  @JoinColumn()
  day: Day;

  @RelationId((member: Member) => member.day)
  dayId: number;
}
