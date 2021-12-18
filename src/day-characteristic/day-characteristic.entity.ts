import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Day } from 'src/day/day.entity';

@Entity('day-characteristics')
export class DayCharacteristic {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'unique identifier',
  })
  id: number;

  @ApiProperty({
    example: [13],
  })
  @Column('simple-array')
  motivation: number[];

  @ApiProperty({
    example: [26],
  })
  @Column('simple-array')
  creativity: number[];

  @ApiProperty({
    example: [3],
  })
  @Column('simple-array')
  support: number;

  @OneToOne(() => Day)
  @JoinColumn()
  @ApiPropertyOptional({ type: () => Day })
  day: Day;
}
