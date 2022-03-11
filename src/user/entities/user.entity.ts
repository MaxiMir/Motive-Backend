import { ApiPropertyOptional } from '@nestjs/swagger';
import { Entity, JoinTable, OneToMany } from 'typeorm';
import { Goal } from 'src/goal/entities/goal.entity';
import { Member } from 'src/member/entities/member.entity';
import { UserWithCharacteristicDto } from 'src/user/dto/user-with-characteristic.dto';

@Entity('users')
export class User extends UserWithCharacteristicDto {
  @OneToMany(() => Goal, (goal) => goal.owner)
  @ApiPropertyOptional({ type: () => Goal, isArray: true })
  goals: Goal[];

  @OneToMany(() => Member, (member) => member.user)
  @JoinTable()
  @ApiPropertyOptional({ type: () => Member, isArray: true })
  membership: Member[];
}
