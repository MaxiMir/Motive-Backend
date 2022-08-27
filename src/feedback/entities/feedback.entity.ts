import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { DayEntity } from 'src/day/entities/day.entity';
import { ConfirmationBaseEntity } from 'src/confirmation/entities/confirmation-base.entity';

@Entity('feedback')
export class FeedbackEntity extends ConfirmationBaseEntity {
  @OneToOne(() => DayEntity, { cascade: true, nullable: false, onDelete: 'CASCADE' })
  @JoinColumn()
  day: DayEntity;
}
