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
    example: ['maximir', 'yulifleur'],
    description: 'list id for favorites',
  })
  favorites: string[];

  @OneToOne(() => User)
  @JoinColumn()
  @ApiProperty({ type: () => User })
  user: User;
}
