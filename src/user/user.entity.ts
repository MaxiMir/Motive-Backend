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
  @ApiProperty({
    example: 'maximir',
    description: 'nickname',
  })
  @PrimaryColumn('varchar', { unique: true, length: 100 })
  id: string;

  @ApiProperty({
    example: 'Maxim Minchenko',
    description: 'name',
  })
  @Column({ length: 100 })
  name: string;

  @ApiProperty({
    example: '/images/4du4de.png',
    description: 'path to avatar',
  })
  @Column({ unique: true })
  avatar: string;

  @ApiProperty({
    example: 1433,
    description: 'page views',
  })
  @Column({ default: 0 })
  views: number;

  @ApiProperty({ type: () => Characteristic })
  @OneToOne(() => Characteristic, { cascade: ['insert'] }) // cascade
  @JoinColumn()
  characteristic: Characteristic;

  @ApiProperty({ type: () => Goal, isArray: true })
  @OneToMany(() => Goal, (goal) => goal.user)
  goals: Goal[];
}
