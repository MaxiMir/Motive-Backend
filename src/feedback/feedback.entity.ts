import { ApiProperty } from '@nestjs/swagger';
import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Day } from 'src/day/day.entity';

@Entity('feedback')
export class Feedback {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'unique identifier',
  })
  id: number;

  @OneToOne(() => Day)
  @JoinColumn()
  day: Day;
}
