import { ApiProperty } from '@nestjs/swagger';
import { Column, Index, PrimaryGeneratedColumn } from 'typeorm';

export class UserBaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'unique identifier',
  })
  id: number;

  @Index({ unique: true })
  @Column()
  @ApiProperty({
    example: 'maximir',
  })
  nickname: string;

  @Index()
  @Column({ length: 100 })
  @ApiProperty({
    example: 'Maxim Minchenko',
  })
  name: string;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({
    example: '/avatars/15058de3-3950-4d29-a380-7d3813aab1bc.webp',
    description: 'the path to the avatar',
  })
  avatar: string | null;
}
