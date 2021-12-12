import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Goal } from 'src/goal/goal.entity';
import { Characteristic } from 'src/characteristic/characteristic.entity';
import { Page } from '../page/page.entity';

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
    example: '/avatars/15058de3-3950-4d29-a380-7d3813aab1bc.webp',
    description: 'the path to the avatar',
  })
  avatar: string;

  @OneToOne(() => Characteristic, { cascade: ['insert'] }) // cascade
  @JoinColumn()
  @ApiPropertyOptional({ type: () => Characteristic })
  characteristic: Characteristic;

  @OneToMany(() => Goal, (goal) => goal.owner)
  @ApiPropertyOptional({ type: () => Goal, isArray: true })
  goals: Goal[];

  @ManyToOne(() => Page, (page) => page.favorites)
  @ApiPropertyOptional({ type: () => Page })
  page: Page;
}
