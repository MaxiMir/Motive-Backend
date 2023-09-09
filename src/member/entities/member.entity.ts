import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { GoalEntity } from 'src/goal/entities/goal.entity';
import { DayEntity } from 'src/day/entities/day.entity';

@Entity('members')
export class MemberEntity {
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

  @ManyToOne(() => GoalEntity, { nullable: false })
  @JoinColumn()
  goal: GoalEntity;

  @RelationId((member: MemberEntity) => member.goal)
  goalId: number;

  @ManyToOne(() => UserEntity, { nullable: false })
  @JoinColumn()
  user: UserEntity;

  @RelationId((member: MemberEntity) => member.user)
  userId: number;

  @ManyToOne(() => DayEntity, { nullable: false })
  @JoinColumn()
  day: DayEntity;

  @RelationId((member: MemberEntity) => member.day)
  dayId: number;
}
