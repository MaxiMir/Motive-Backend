import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { MainCharacteristicsDto } from 'src/abstract/main-characteristics.dto';
import { Goal } from 'src/goal/goal.entity';

@Entity('goal-characteristics')
export class GoalCharacteristic extends MainCharacteristicsDto {
  @ApiProperty({
    example: 1,
    description: 'members',
  })
  @Column({ default: 0 })
  members: number;

  @OneToOne(() => Goal)
  @JoinColumn()
  @ApiPropertyOptional({ type: () => Goal })
  goal: Goal;
}
