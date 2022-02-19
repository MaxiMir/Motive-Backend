import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Entity('subscription')
export class Subscription {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'unique identifier',
  })
  id: number;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn()
  user: User;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn()
  follower: User;

  @Index({ unique: true })
  @Column()
  @ApiProperty({
    example: '1:53',
    description: '{user.id}:{follower.id}',
  })
  uniq: string;
}
