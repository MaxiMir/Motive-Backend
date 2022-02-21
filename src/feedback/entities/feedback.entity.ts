import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { Day } from 'src/day/entities/day.entity';
import { ConfirmationBase } from 'src/confirmation/entities/confirmation-base.entity';

@Entity('feedback')
export class Feedback extends ConfirmationBase {
  @OneToOne(() => Day, { cascade: true, nullable: false })
  @JoinColumn()
  day: Day;
}
