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
  @Column({ nullable: true })
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

  @Column({ select: false, nullable: true })
  @Index({ unique: true })
  @ApiProperty({
    example: 'mmirrev@gmail.com',
  })
  email: string;

  @Index({ unique: true })
  @Column({ select: false })
  @ApiProperty({
    description: 'provider + sub',
    example: 'google-104276456383276546000',
  })
  authId: string;

  @Column('boolean', { nullable: true })
  @ApiProperty({
    example: true,
  })
  online: boolean;

  @Column({ type: 'timestamp with time zone', nullable: true })
  @ApiProperty({
    example: '2022-02-16 00:00:00+03',
  })
  lastSeen: string | null;

  @Column({ nullable: true })
  @ApiProperty({
    example: 'mobile',
  })
  device: string;

  @Column({ select: false, nullable: true })
  @ApiProperty({
    example: "It's death to settle for things in life ☠️",
  })
  motto: string;

  @Column({ select: false, nullable: true })
  @ApiProperty({
    example: 'Moscow️',
  })
  location: string;

  @Column({ select: false, nullable: true })
  @ApiProperty({
    example: 'Dream developer 🧿',
  })
  bio: string;

  @Column({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
    select: false,
  })
  @ApiProperty({
    example: '2022-02-16 00:00:00+03',
  })
  registered: string;

  @Column('simple-json', { select: false, nullable: true })
  @ApiProperty({
    example: [{ href: 'https://linkedin.com/in/maximir', host: 'linkedin.com', title: 'Linkedin' }],
  })
  links: Array<{ href: string; host: string; title?: string }>;
}
