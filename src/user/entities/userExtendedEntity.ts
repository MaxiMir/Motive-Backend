import { ApiProperty } from '@nestjs/swagger';
import { Column, Index } from 'typeorm';
import { UserBaseEntity } from './user-base.entity';

export class UserExtendedEntity extends UserBaseEntity {
  @Column({ select: false, nullable: true })
  @Index({ unique: true })
  @ApiProperty({
    example: 'mmirrev@gmail.com',
  })
  email: string;

  @Column({ select: false, nullable: true })
  @ApiProperty({
    example: '135316',
  })
  sub: string;

  @Column({ select: false, nullable: true })
  @ApiProperty({
    example: 'Github',
  })
  provider: string;

  @Column('boolean', { nullable: true })
  @ApiProperty({
    example: true,
  })
  online: boolean;

  @Column({ type: 'timestamp with time zone', nullable: true })
  @ApiProperty({
    example: '2022-02-16 00:00:00+03',
  })
  lastSeen: string;

  @Column({ nullable: true })
  @ApiProperty({
    example: 'mobile',
  })
  device: string;
}
