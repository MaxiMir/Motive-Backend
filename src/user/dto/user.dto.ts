import { ApiProperty } from '@nestjs/swagger';
import { Column, Index } from 'typeorm';
import { UserBaseDto } from './user-base.dto';

export class UserDto extends UserBaseDto {
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

  @Column({ nullable: true })
  @ApiProperty({
    example: 'online',
  })
  status: string;

  @Column({ nullable: true })
  @ApiProperty({
    example: 'mobile',
  })
  device: string;
}
