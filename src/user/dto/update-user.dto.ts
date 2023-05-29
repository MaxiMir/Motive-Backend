import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateUserDto {
  @IsString()
  @Transform(({ value }) => value.trim())
  @Length(3, 100)
  @ApiProperty({
    example: 'Maxim Minchenko',
  })
  readonly name: string;

  @IsString()
  @Transform(({ value }) => value.trim())
  @Length(3, 100)
  @ApiProperty({
    example: 'maximir',
  })
  readonly nickname: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => value?.trim())
  @MaxLength(140)
  @ApiProperty({
    example: "It's death to settle for things in life ☠️",
  })
  readonly motto: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => value?.trim())
  @MaxLength(64)
  @ApiProperty({
    example: 'Pattaya',
  })
  readonly location: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => value?.trim())
  @MaxLength(320)
  @ApiProperty({
    example: 'Dream developer 🧿',
  })
  readonly bio: string;
}
