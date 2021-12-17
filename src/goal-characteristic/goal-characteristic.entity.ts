import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { MainCharacteristics } from 'src/abstract/main-characteristics';
import { Goal } from 'src/goal/goal.entity';

@Entity('goal-characteristics')
export class GoalCharacteristic extends MainCharacteristics {
  @ApiProperty({
    example: 1,
  })
  @Column({ default: 0 })
  members: number;

  @OneToOne(() => Goal)
  @JoinColumn()
  @ApiPropertyOptional({ type: () => Goal })
  goal: Goal;
}
