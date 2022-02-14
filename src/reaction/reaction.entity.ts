import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/user.entity';
import { Characteristic, CHARACTERISTICS } from 'src/abstracts/characteristic';
import { Day } from 'src/day/day.entity';
import { Goal } from '../goal/goal.entity';

@Entity('reactions')
export class Reaction {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'unique identifier',
  })
  id: number;

  @Column({
    type: 'enum',
    enum: CHARACTERISTICS,
    nullable: false,
  })
  characteristic: Characteristic;

  @ManyToOne(() => Goal, { nullable: false })
  @JoinColumn()
  goal: Goal;

  @RelationId((reaction: Reaction) => reaction.goal)
  goalId: number;

  @ManyToOne(() => Day, { nullable: false })
  @JoinColumn()
  day: Day;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn()
  user: User;

  @Index({ unique: true })
  @Column()
  @ApiProperty({
    example: '1:53',
    description: '{user.id}:{day.id}:{characteristic}',
  })
  uniq: string;
}
