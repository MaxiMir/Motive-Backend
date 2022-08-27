import { ApiPropertyOptional } from '@nestjs/swagger';
import { Entity, JoinTable, OneToMany } from 'typeorm';
import { GoalEntity } from 'src/goal/entities/goal.entity';
import { MemberEntity } from 'src/member/entities/member.entity';
import { UserWithCharacteristicEntity } from 'src/user/entities/user-with-characteristic.entity';

@Entity('users')
export class UserEntity extends UserWithCharacteristicEntity {
  @OneToMany(() => GoalEntity, (goal) => goal.owner)
  @ApiPropertyOptional({ type: () => GoalEntity, isArray: true })
  goals: GoalEntity[];

  @OneToMany(() => MemberEntity, (member) => member.user)
  @JoinTable()
  @ApiPropertyOptional({ type: () => MemberEntity, isArray: true })
  membership: MemberEntity[];
}
