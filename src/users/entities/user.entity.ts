import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Goal } from 'src/goals/entities/goal.entity';
import { Characteristic } from 'src/characteristics/entities/characteristic.entity';

@Entity()
export class User {
  @PrimaryColumn('varchar', { unique: true, length: 256 })
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  avatar: string;

  @Column({ default: 0 })
  views: number;

  @OneToOne(() => Characteristic)
  @JoinColumn()
  characteristics: Characteristic;

  @OneToMany(() => Goal, (goal) => goal.user)
  goals: Goal[];
}
