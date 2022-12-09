import { ApiProperty } from '@nestjs/swagger';
import { UserWithCharacteristicEntity } from 'src/user/entities/user-with-characteristic.entity';
import { GoalEntity } from 'src/goal/entities/goal.entity';
import { HashtagEntity } from 'src/hashtag/entities/hashtag.entity';

export class SearchDto {
  @ApiProperty({
    example: 'Maxim Minchenko',
    description: 'search phrase',
  })
  readonly q: string;

  @ApiProperty({ type: () => HashtagEntity, isArray: true })
  readonly hashtags: HashtagEntity[];

  @ApiProperty({ type: () => GoalEntity, isArray: true })
  readonly goals: GoalEntity[];

  @ApiProperty({ type: () => UserWithCharacteristicEntity, isArray: true })
  readonly users: UserWithCharacteristicEntity[];
}
