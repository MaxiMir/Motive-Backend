import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Goal } from 'src/goal/goal.entity';
import { UserCharacteristic } from 'src/user-characteristic/user-characteristic.entity';
import { Preferences } from 'src/preferences/preferences.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'unique identifier',
  })
  id: number;

  @Index({ unique: true })
  @Column()
  @ApiProperty({
    example: 'maximir',
    description: 'nickname',
  })
  nickname: string;

  @Column({ length: 100 })
  @ApiProperty({
    example: 'Maxim Minchenko',
    description: 'name',
  })
  name: string;

  @Column()
  @ApiProperty({
    example: '/avatars/15058de3-3950-4d29-a380-7d3813aab1bc.webp',
    description: 'the path to the avatar',
  })
  avatar: string;

  @Column({ default: 0 })
  @ApiProperty({
    example: 1433,
    description: 'page views',
  })
  view: number;

  @OneToOne(() => UserCharacteristic, (characteristic) => characteristic.user)
  @ApiPropertyOptional({ type: () => UserCharacteristic })
  characteristic: Promise<UserCharacteristic>;

  @OneToMany(() => Goal, (goal) => goal.owner)
  @ApiPropertyOptional({ type: () => Goal, isArray: true })
  goals: Promise<Goal[]>;

  @OneToOne(() => Preferences, (preferences) => preferences.user)
  @ApiPropertyOptional({ type: () => Preferences })
  preferences: Promise<Preferences>;
}
