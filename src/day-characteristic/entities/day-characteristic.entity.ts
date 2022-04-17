import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';
import { Day } from 'src/day/entities/day.entity';

@Entity('day-characteristics')
export class DayCharacteristic {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'unique identifier',
  })
  id: number;

  @ApiProperty({
    example: 242,
  })
  @Column({ default: 0 })
  motivation: number;

  @ApiProperty({
    example: 41,
  })
  @Column({ default: 0 })
  creativity: number;

  @ApiProperty({
    example: 13,
  })
  @Column({ default: 0 })
  support: number;

  @OneToOne(() => Day, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn()
  day: Day;

  @RelationId((characteristic: DayCharacteristic) => characteristic.day)
  dayId: number;
}
