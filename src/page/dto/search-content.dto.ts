import { ApiProperty } from '@nestjs/swagger';
import { UserWithCharacteristicDto } from 'src/user/dto/user-with-characteristic.dto';
import { Goal } from 'src/goal/entities/goal.entity';
import { Hashtag } from 'src/hashtag/entities/hashtag.entity';

export class SearchContentDto {
  @ApiProperty({
    example: 'Maxim Minchenko',
    description: 'search phrase',
  })
  readonly q: string;

  @ApiProperty({ type: () => Hashtag, isArray: true })
  readonly hashtags: Hashtag[];

  @ApiProperty({ type: () => Goal, isArray: true })
  readonly goals: Goal[];

  @ApiProperty({ type: () => UserWithCharacteristicDto, isArray: true })
  readonly users: UserWithCharacteristicDto[];
}
