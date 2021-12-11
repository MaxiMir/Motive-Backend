import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Goal } from 'src/goal/goal.entity';
import { Characteristic } from 'src/characteristic/characteristic.entity';

@Entity('users')
export class User {
  @PrimaryColumn('varchar', { unique: true, length: 100 })
  @ApiProperty({
    example: 'maximir',
    description: 'nickname',
  })
  id: string;

  @Column({ length: 100 })
  @ApiProperty({
    example: 'Maxim Minchenko',
    description: 'name',
  })
  name: string;

  @Column({ unique: true })
  @ApiProperty({
    example: '/images/4du4de.png',
    description: 'path to avatar',
  })
  avatar: string;

  @Column({ default: 0 })
  @ApiProperty({
    example: 1433,
    description: 'page views',
  })
  views: number;

  @OneToOne(() => Characteristic, { cascade: ['insert'] }) // cascade
  @JoinColumn()
  @ApiProperty({ type: () => Characteristic })
  characteristic: Characteristic;

  @OneToMany(() => Goal, (goal) => goal.owner)
  @ApiProperty({ type: () => User, isArray: true })
  goals: Goal[];
}
