import { IsString, Length, Validate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Unique } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

export class CreateUserDto {
  @IsString()
  @Validate(Unique, [User, 'id'])
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
}
