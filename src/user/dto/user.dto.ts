import { ApiProperty } from '@nestjs/swagger';
import { Column, Index } from 'typeorm';
import { UserBaseDto } from './user-base.dto';

export class UserDto extends UserBaseDto {
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
