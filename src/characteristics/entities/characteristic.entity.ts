import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Characteristic {
  @ApiProperty({
    example: 1,
    description: 'unique identifier',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 13,
    description: 'motivation',
  })
  @Column({ default: 0 })
  motivation: number;

  @ApiProperty({
    example: 26,
    description: 'creativity',
  })
  @Column({ default: 0 })
  creativity: number;

  @ApiProperty({
    example: 3,
    description: 'support',
  })
  @Column({ default: 0 })
  support: number;

  @ApiProperty({
    example: 1,
    description: 'completed',
  })
  @Column({ default: 0 })
  completed: number;

  @ApiProperty({
    example: 5,
    description: 'abandoned',
  })
  @Column({ default: 0 })
  abandoned: number;

  @ApiProperty({
    example: 0,
    description: 'awards',
  })
  @Column({ default: 0 })
  awards: number;
}
