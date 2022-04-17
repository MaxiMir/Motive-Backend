import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';
import { Characteristic, CHARACTERISTICS } from 'src/abstracts/characteristic';
import { Day } from 'src/day/entities/day.entity';
import { Goal } from 'src/goal/entities/goal.entity';

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

  @ManyToOne(() => Goal, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn()
  goal: Goal;

  @RelationId((reaction: Reaction) => reaction.goal)
  goalId: number;

  @ManyToOne(() => Day, { nullable: false, onDelete: 'CASCADE' })
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
