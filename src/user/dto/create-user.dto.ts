import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @Transform(({ value }) => value.trim())
  @Length(3, 100)
  @ApiProperty({
    example: 'Maxim Minchenko',
  })
  readonly name: string;

  @IsEmail()
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @ApiProperty({
    example: 'maximir',
  })
  readonly email: string;

  @IsString()
  @IsOptional()
  readonly avatar?: string;

  @IsString()
  readonly authId: string;
}
