import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Day } from 'src/day/entities/day.entity';
import { GoalCharacteristic } from 'src/goal-characteristic/entities/goal-characteristic.entity';

@Entity('goals', {
  orderBy: {
    id: 'ASC',
  },
})
export class Goal {
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

  @OneToOne(() => GoalCharacteristic, (characteristic) => characteristic.goal, {
    cascade: true,
  })
  @ApiPropertyOptional({ type: () => GoalCharacteristic })
  characteristic: GoalCharacteristic;

  @OneToMany(() => Day, (day) => day.goal, { cascade: true })
  @ApiPropertyOptional({ type: () => Day, isArray: true })
  days: Day[];

  @Column('boolean', { default: false })
  @ApiProperty({
    example: true,
    description: 'goal completed',
  })
  completed = false;

  @ManyToOne(() => User, (user) => user.goals, {
    nullable: false,
    cascade: true,
  })
  owner: User;

  @RelationId((goal: Goal) => goal.owner)
  ownerId: number;
}
