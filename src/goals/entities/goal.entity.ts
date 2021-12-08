import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Goal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  started: string;

  @Column('simple-array')
  hashtags: string[];

  @ManyToOne(() => User, (user) => user.goals)
  user: User;
}
