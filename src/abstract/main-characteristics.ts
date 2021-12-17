import { ApiProperty } from '@nestjs/swagger';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class MainCharacteristics {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'unique identifier',
  })
  id: number;

  @ApiProperty({
    example: 13,
  })
  @Column({ default: 0 })
  motivation: number;

  @ApiProperty({
    example: 26,
  })
  @Column({ default: 0 })
  creativity: number;

  @ApiProperty({
    example: 3,
  })
  @Column({ default: 0 })
  support: number;
}
