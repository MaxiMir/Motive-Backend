import { ApiProperty } from '@nestjs/swagger';
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

  @Column('int', { array: true })
  @ApiProperty({
    example: [23, 33],
    description: 'user id list',
  })
  motivation: number[] = [];

  @Column('int', { array: true })
  @ApiProperty({
    example: [23, 33],
    description: 'user id list',
  })
  creativity: number[] = [];

  @ApiProperty({
    example: 13,
  })
  @Column({ default: 0 })
  support: number;

  @OneToOne(() => Day)
  @JoinColumn()
  day: Day;
}
