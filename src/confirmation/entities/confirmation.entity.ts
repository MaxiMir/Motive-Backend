import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Goal } from 'src/goal/entities/goal.entity';
import { User } from 'src/user/entities/user.entity';
import { ConfirmationBase } from './confirmation-base.entity';

@Entity('confirmations')
export class Confirmation extends ConfirmationBase {
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

  @OneToOne(() => Goal, { cascade: true, nullable: false })
  @JoinColumn()
  goal: Goal;

  @OneToOne(() => User, { nullable: false })
  @JoinColumn()
  user: User;

  @OneToOne(() => User, { nullable: false })
  @JoinColumn()
  owner: User;

  @Column('boolean')
  @ApiProperty({
    example: true,
  })
  inherited: boolean;
}
