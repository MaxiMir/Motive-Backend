import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/user/user.entity';

@Entity('user-characteristics')
export class UserCharacteristic {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'unique identifier',
  })
  id: number;

  @ApiProperty({
    example: 13,
  })
  @Column({ type: 'float', scale: 2, default: 1.0 })
  motivation: number;

  @ApiProperty({
    example: 26,
  })
  @Column({ type: 'float', scale: 2, default: 1.0 })
  creativity: number;

  @ApiProperty({
    example: 3,
  })
  @Column({ type: 'float', scale: 2, default: 1.0 })
  support: number;

  @ApiProperty({
    example: 1,
  })
  @Column({ default: 0 })
  completed: number;

  @ApiProperty({
    example: 5,
  })
  @Column({ default: 0 })
  abandoned: number;

  @ApiProperty({
    example: 0,
  })
  @Column({ default: 0 })
  followers: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
