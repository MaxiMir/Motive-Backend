import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/user/user.entity';

@Entity('pages')
export class Page {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'unique identifier',
  })
  id: number;

  @Column({ default: 0 })
  @ApiProperty({
    example: 1433,
    description: 'page views',
  })
  view: number;

  @OneToMany(() => User, (user) => user.id)
  @JoinColumn()
  @ApiProperty({ type: () => User, isArray: true })
  favorites: User[];

  @OneToOne(() => User, { cascade: ['insert'] }) // cascade
  @JoinColumn()
  @ApiProperty({ type: () => User })
  user: User;
}
