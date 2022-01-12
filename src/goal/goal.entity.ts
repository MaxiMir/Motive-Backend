import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Day } from 'src/day/day.entity';
import { GoalCharacteristic } from 'src/goal-characteristic/goal-characteristic.entity';

@Entity('goals')
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
    default: () => 'CURRENT_TIMESTAMP',
  })
  @ApiProperty({
    example: '2021-08-15 21:05:15.723336+07',
    description: 'created date',
  })
  started: string;

  @Column('simple-array')
  @ApiProperty({
    example: ['knowledge', 'education'],
    description: 'hashtags array',
  })
  hashtags: string[];

  @OneToOne(() => GoalCharacteristic, (characteristic) => characteristic.goal, {
    eager: true,
    cascade: true,
  })
  @ApiPropertyOptional({ type: () => GoalCharacteristic })
  characteristic: GoalCharacteristic;

  @OneToMany(() => Day, (day) => day.goal, { cascade: true })
  @ApiPropertyOptional({ type: () => Day, isArray: true })
  days: Day[];

  @ManyToOne(() => User, (user) => user.goals, {
    eager: true,
    cascade: true,
  })
  owner: User;
}
