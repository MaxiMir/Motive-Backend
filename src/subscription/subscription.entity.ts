import { ApiProperty } from '@nestjs/swagger';
import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/user/user.entity';

@Entity('subscription')
export class Subscription {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'unique identifier',
  })
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToOne(() => User)
  @JoinColumn()
  follower: User;
}
