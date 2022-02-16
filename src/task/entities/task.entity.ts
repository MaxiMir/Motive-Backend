import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Day } from 'src/day/entities/day.entity';

@Entity('tasks', {
  orderBy: {
    id: 'ASC',
  },
})
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
  })
  name: string;

  @Column({
    type: 'timestamp with time zone',
    nullable: true,
  })
  @ApiPropertyOptional({
    example: '2022-02-16 00:00:00+03',
    description: 'reminder date',
  })
  date: string;

  @Column('boolean', { nullable: true, default: false })
  @ApiProperty({
    example: true,
    description: 'completed by owner',
  })
  completed = false;

  @Column('int', { array: true })
  @ApiProperty({
    example: [23, 33],
    description: 'user id list',
  })
  completedBy: number[] = [];

  @ManyToOne(() => Day, (day) => day.tasks, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  day: Day;
}
