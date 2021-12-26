import { ApiPropertyOptional } from '@nestjs/swagger';
import { Entity, JoinTable, ManyToMany, OneToMany, OneToOne } from 'typeorm';
import { Goal } from 'src/goal/goal.entity';
import { Subscription } from 'src/subscription/subscription.entity';
import { UserWithCharacteristicDto } from './dto/user-with-characteristic.dto';

@Entity('users')
export class User extends UserWithCharacteristicDto {
  @OneToMany(() => Goal, (goal) => goal.owner)
  @ApiPropertyOptional({ type: () => Goal, isArray: true })
  goals: Goal[];

  @ManyToMany(() => Goal)
  @JoinTable()
  @ApiPropertyOptional({ type: () => Goal, isArray: true })
  member: Goal[];

  @OneToOne(() => Subscription, (subscription) => subscription.user, { cascade: true })
  @ApiPropertyOptional({ type: () => Subscription })
  subscription: Subscription;
}
