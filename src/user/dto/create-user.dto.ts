import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(3, 100)
  @ApiProperty({
    example: 'Maxim Minchenko',
  })
  readonly name: string;

  @IsEmail()
  @ApiProperty({
    example: 'maximir',
  })
  readonly email: string;

  @IsString()
  @IsOptional()
  readonly avatar: string;

  @IsString()
  @IsOptional()
  readonly sub: string;

  @IsString()
  @IsOptional()
  readonly provider: string;
}
