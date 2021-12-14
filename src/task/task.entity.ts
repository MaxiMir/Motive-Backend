import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Day } from 'src/day/day.entity';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'unique identifier',
  })
  id: number;

  @Column()
  @ApiProperty({
    example: 'read 20 pages Harry Potter',
    description: 'name',
  })
  name: string;

  @Column({
    type: 'timestamp with time zone',
  })
  @ApiProperty({
    example: '2021-08-15 21:05:15.723336+07',
    description: 'reminder date',
  })
  date: string;

  @Column('simple-array')
  @ApiProperty({
    example: [23, 33],
    description: 'list id users who completed task',
  })
  completedBy: number[];

  @ManyToOne(() => Day, (day) => day.tasks)
  @ApiPropertyOptional({ type: () => Day })
  day: Promise<Day>;
}
