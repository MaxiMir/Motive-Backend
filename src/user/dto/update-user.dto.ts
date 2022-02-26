import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, Validate } from 'class-validator';
import { User } from 'src/user/entities/user.entity';
import { Unique } from 'src/validators/unique';

export class UpdateUserDto {
  @IsString()
  @Length(3, 100)
  @ApiProperty({
    example: 'Maxim Minchenko',
  })
  readonly name: string;

  @IsString()
  @Validate(Unique, [User])
  @Length(3, 100)
  @ApiProperty({
    example: 'maximir',
  })
  readonly nickname: string;
}
