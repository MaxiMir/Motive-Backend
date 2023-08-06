import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/user/entities/user.entity';
import { DayEntity } from 'src/day/entities/day.entity';
import { GoalEntity } from 'src/goal/entities/goal.entity';

@Entity('day-points')
export class DayPointEntity {
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
    description: '{user.id}:{day.id}',
  })
  uniq: string;

  @ManyToOne(() => GoalEntity, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn()
  goal: GoalEntity;

  @RelationId((reaction: DayPointEntity) => reaction.goal)
  goalId: number;

  @ManyToOne(() => DayEntity, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn()
  day: DayEntity;

  @ManyToOne(() => UserEntity, { nullable: false })
  @JoinColumn()
  user: UserEntity;
}
