import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToOne } from 'typeorm';
import { Goal } from 'src/goal/entities/goal.entity';
import { ConfirmationBase } from './confirmation-base.entity';

@Entity('confirmations')
export class Confirmation extends ConfirmationBase {
  @Column({ type: 'timestamp with time zone' })
  @ApiProperty({
    example: '2022-02-16 00:00:00+03',
  })
  date: string;

  @OneToOne(() => Goal)
  goal: Goal;
}
