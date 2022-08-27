import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/user/entities/user.entity';
import { CharacteristicDto, CHARACTERISTICS } from 'src/common/characteristic.dto';
import { DayEntity } from 'src/day/entities/day.entity';
import { GoalEntity } from 'src/goal/entities/goal.entity';

@Entity('reactions')
export class ReactionEntity {
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
  characteristic: CharacteristicDto;

  @ManyToOne(() => GoalEntity, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn()
  goal: GoalEntity;

  @RelationId((reaction: ReactionEntity) => reaction.goal)
  goalId: number;

  @ManyToOne(() => DayEntity, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn()
  day: DayEntity;

  @ManyToOne(() => UserEntity, { nullable: false })
  @JoinColumn()
  user: UserEntity;

  @Index({ unique: true })
  @Column()
  @ApiProperty({
    example: '1:53',
    description: '{user.id}:{day.id}:{characteristic}',
  })
  uniq: string;
}
