import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';

@Entity('subscription')
export class SubscriptionEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'unique identifier',
  })
  id: number;

  @ManyToOne(() => UserEntity, { nullable: false })
  @JoinColumn()
  user: UserEntity;

  @ManyToOne(() => UserEntity, { nullable: false })
  @JoinColumn()
  follower: UserEntity;

  @Index({ unique: true })
  @Column()
  @ApiProperty({
    example: '1:53',
    description: '{user.id}:{follower.id}',
  })
  uniq: string;
}
