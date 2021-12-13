import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/user.entity';

@Entity('preferences')
export class Preferences {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'unique identifier',
  })
  id: number;

  @Column('simple-array')
  @ApiProperty({
    example: [23, 33],
    description: 'list id for favorites',
  })
  favorites: number[];

  @OneToOne(() => User)
  @JoinColumn()
  @ApiProperty({ type: () => User })
  user: Promise<User>;
}