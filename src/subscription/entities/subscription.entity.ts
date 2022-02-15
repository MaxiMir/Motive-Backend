import { ApiProperty } from '@nestjs/swagger';
import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Entity('subscription')
export class Subscription {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'unique identifier',
  })
  id: number;

  @OneToOne(() => User, { nullable: false })
  @JoinColumn()
  user: User;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn()
  follower: User;
}
