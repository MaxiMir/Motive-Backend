import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { DayEntity } from 'src/day/entities/day.entity';
import { GoalCharacteristicEntity } from 'src/goal-characteristic/entities/goal-characteristic.entity';

@Entity('goals')
export class GoalEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'unique identifier',
  })
  id: number;

  @Column()
  @ApiProperty({
    example: 'Learn English',
  })
  name: string;

  @Column({
    type: 'timestamp with time zone',
    default: () => "'TODAY'",
  })
  @ApiProperty({
    example: '2022-02-16 00:00:00+03',
  })
  started: string;

  @Column({
    type: 'timestamp with time zone',
    default: () => "'TODAY'",
  })
  @ApiProperty({
    example: '2022-02-16 00:00:00+03',
    description: 'user time / server time',
  })
  updated: string;

  @Column('simple-array')
  @ApiProperty({
    example: ['knowledge', 'education'],
  })
  hashtags: string[];

  @Column('simple-array')
  @ApiProperty({
    example: ['Develop basic functionality', 'Alpha testing', 'Production release'],
  })
  stages: string[];

  @Column({ default: 0 })
  stage: number;

  @OneToOne(() => GoalCharacteristicEntity, (characteristic) => characteristic.goal, {
    cascade: true,
  })
  @ApiPropertyOptional({ type: () => GoalCharacteristicEntity })
  characteristic: GoalCharacteristicEntity;

  @OneToMany(() => DayEntity, (day) => day.goal, { cascade: true })
  @ApiPropertyOptional({ type: () => DayEntity, isArray: true })
  days: DayEntity[];

  @Column('boolean', { default: false })
  @ApiProperty({
    example: true,
    description: 'goal completed',
  })
  completed = false;

  @ManyToOne(() => UserEntity, (user) => user.goals, {
    nullable: false,
    cascade: true,
  })
  owner: UserEntity;

  @RelationId((goal: GoalEntity) => goal.owner)
  ownerId: number;
}
