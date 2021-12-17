import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, Index, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
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
  })
  nickname: string;

  @Column({ length: 100 })
  @ApiProperty({
    example: 'Maxim Minchenko',
  })
  name: string;

  @Column()
  @ApiProperty({
    example: '/avatars/15058de3-3950-4d29-a380-7d3813aab1bc.webp',
    description: 'the path to the avatar',
  })
  avatar: string;

  @OneToOne(() => UserCharacteristic, (characteristic) => characteristic.user, { cascade: true })
  @ApiPropertyOptional({ type: () => UserCharacteristic })
  characteristic: UserCharacteristic;

  @OneToMany(() => Goal, (goal) => goal.owner)
  @ApiPropertyOptional({ type: () => Goal, isArray: true })
  goals: Goal[];

  @OneToOne(() => Preferences, (preferences) => preferences.user)
  @ApiPropertyOptional({ type: () => Preferences })
  preferences: Preferences;
}
