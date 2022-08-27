import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';
import { GoalEntity } from 'src/goal/entities/goal.entity';

@Entity('goal-characteristics')
export class GoalCharacteristicEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'unique identifier',
  })
  id: number;

  @ApiProperty({
    example: 13,
  })
  @Column({ default: 0 })
  motivation: number;

  @ApiProperty({
    example: 26,
  })
  @Column({ default: 0 })
  creativity: number;

  @ApiProperty({
    example: 3,
  })
  @Column({ default: 0 })
  support: number;

  @ApiProperty({
    example: 1,
    description: 'members',
  })
  @Column({ default: 0 })
  members: number;

  @OneToOne(() => GoalEntity, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  goal: GoalEntity;

  @RelationId((characteristic: GoalCharacteristicEntity) => characteristic.goal)
  goalId: number;
}
