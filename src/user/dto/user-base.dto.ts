import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user-dto';

export class UserBaseDto extends CreateUserDto {
  @IsString()
  @ApiProperty({
    example: '/images/4v5eg3.png',
    description: 'the path to the avatar',
  })
  readonly avatar: string;
}
