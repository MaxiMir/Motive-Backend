import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { GoalEntity } from 'src/goal/entities/goal.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { ConfirmationBaseEntity } from './confirmation-base.entity';

@Entity('confirmations')
export class ConfirmationEntity extends ConfirmationBaseEntity {
  @Column({ type: 'timestamp with time zone' })
  @ApiProperty({
    example: '2022-02-16 00:00:00+03',
  })
  started: string;

  @Column({ type: 'timestamp with time zone' })
  @ApiProperty({
    example: '2022-02-16 00:00:00+03',
  })
  end: string;

  @ManyToOne(() => GoalEntity, { cascade: true, nullable: false })
  @JoinColumn()
  goal: GoalEntity;

  @ManyToOne(() => UserEntity, { nullable: false })
  @JoinColumn()
  user: UserEntity;

  @Column('boolean')
  @ApiProperty({
    example: true,
  })
  member: boolean;
}
