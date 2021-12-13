import { ApiProperty } from '@nestjs/swagger';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class MainCharacteristics {
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
}
