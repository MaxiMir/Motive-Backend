import { ApiProperty } from '@nestjs/swagger';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class ConfirmationBase {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'unique identifier',
  })
  id: number;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({
    example: 'It was a tough day...',
  })
  text: string;

  @Column('simple-json', { nullable: true })
  @ApiProperty({
    example: { data: [{ src: '/feedback/15058de3-3950-4d29-a380-7d3813aab1bc.webp', width: 4, height: 3 }] },
  })
  photos: { src: string; width: number; height: number }[];

  @Column({ type: 'text', nullable: true })
  @ApiProperty({
    example: ['/video/7d3813aab1bc.mp4'],
  })
  video: string;
}
