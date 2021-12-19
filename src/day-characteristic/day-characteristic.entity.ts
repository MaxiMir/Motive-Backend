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

  @Column('simple-array')
  @ApiProperty({
    example: [13],
  })
  motivation: number[];

  @Column('simple-array')
  @ApiProperty({
    example: [26],
  })
  creativity: number[];

  @Column('simple-array')
  @ApiProperty({
    example: [3],
  })
  support: number;

  @OneToOne(() => Day)
  @JoinColumn()
  @ApiPropertyOptional({ type: () => Day })
  day: Day;
}
