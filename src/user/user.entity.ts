import { ApiPropertyOptional } from '@nestjs/swagger';
import { Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { Goal } from 'src/goal/goal.entity';
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
}
