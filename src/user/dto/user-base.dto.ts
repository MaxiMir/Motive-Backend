import { IsString, Length, Validate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Unique } from 'src/validators/unique';
import { User } from 'src/user/user.entity';

export class UserBaseDto {
  @IsString()
  @Validate(Unique, [User])
  @Length(3, 100)
  @ApiProperty({
    example: 'maximir',
    description: 'nickname',
  })
  readonly id: string;

  @IsString()
  @Length(3, 100)
  @ApiProperty({
    example: 'Maxim Minchenko',
    description: 'name',
  })
  readonly name: string;

  @IsString()
  @ApiProperty({
    example: '/images/4v5eg3.png',
    description: 'the path to the avatar',
  })
  readonly avatar: string;
}
