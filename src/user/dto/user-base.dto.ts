import { ApiProperty } from '@nestjs/swagger';
import { Column, Index, PrimaryGeneratedColumn } from 'typeorm';

export class UserBaseDto {
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

  @Column({ length: 100 })
  @ApiProperty({
    example: 'Maxim Minchenko',
  })
  name: string;

  @Column({ nullable: true })
  @ApiProperty({
    example: '/avatars/15058de3-3950-4d29-a380-7d3813aab1bc.webp',
    description: 'the path to the avatar',
  })
  avatar: string;

  @Column({ nullable: true })
  @Index({ unique: true })
  @ApiProperty({
    example: 'mmirrev@gmail.com',
  })
  email: string;

  @Column({ nullable: true })
  @ApiProperty({
    example: '135316',
  })
  sub: string;

  @Column({ nullable: true })
  @ApiProperty({
    example: 'Github',
  })
  provider: string;
}
