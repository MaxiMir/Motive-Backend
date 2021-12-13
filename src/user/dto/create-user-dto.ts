import { IsString, Length, Validate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/user.entity';
import { Unique } from 'src/validators/unique';

export class CreateUserDto {
  @IsString()
  @Validate(Unique, [User])
  @Length(3, 100)
  @ApiProperty({
    example: 'maximir',
    description: 'nickname',
  })
  readonly nickname: string;

  @IsString()
  @Length(3, 100)
  @ApiProperty({
    example: 'Maxim Minchenko',
    description: 'name',
  })
  readonly name: string;
}
