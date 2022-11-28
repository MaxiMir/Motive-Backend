import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DayEntity } from 'src/day/entities/day.entity';

@Entity('tasks', {
  orderBy: {
    id: 'ASC',
  },
})
export class TaskEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'unique identifier',
  })
  id: number;

  @Column()
  userId: number;

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

  @Column('boolean', { default: false })
  @ApiProperty({
    example: true,
    description: 'completed by owner',
  })
  completed = false;

  @Column('boolean', { default: false })
  @ApiProperty({
    example: true,
    description: 'completed by other',
  })
  completedByOthers = false;

  @ManyToOne(() => DayEntity, (day) => day.tasks, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  day: DayEntity;
}
