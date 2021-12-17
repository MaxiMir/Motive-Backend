import { Controller, Get, Param, ParseArrayPipe, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ParseGoalDateMapPipe } from 'src/pipes/parse-goal-date-map.pipe';
import { UserService } from 'src/user/user.service';
import { DayService } from 'src/day/day.service';
import { UserPageDto } from './dto/user.page.dto';

@Controller('pages')
@ApiTags('Pages')
export class PageController {
  constructor(private readonly userService: UserService, private readonly dayService: DayService) {}

  @Get('/users/:nickname')
  @ApiOperation({ summary: 'Get user page' })
  @ApiParam({ name: 'nickname', example: 'maximir' })
  @ApiQuery({
    name: 'd',
    example: '314:532,214:312',
    description: 'dates for goals [goal.id]:[day.id]',
    allowEmptyValue: true,
  })
  @ApiResponse({ status: 200, type: UserPageDto })
  async getUser(
    @Param('nickname') nickname: string,
    @Query('d', new ParseArrayPipe({ items: String, separator: ',', optional: true }), ParseGoalDateMapPipe)
    goalDatesMap,
  ): Promise<UserPageDto> {
    const user = await this.userService.findByNickname(nickname, {
      relations: ['characteristic', 'preferences', 'goals'],
    });
    const goals = await Promise.all(
      user.goals.map(async (goal) => ({
        ...goal,
        day: await (goalDatesMap[goal.id]
          ? this.dayService.findByPK(goalDatesMap[goal.id])
          : this.dayService.findLastAdd({ goal: goal.id })),
      })),
    );

    return {
      client: user, // TODO replace
      meta: {
        title: user.name,
        description: `See how ${user.name} (@${user.nickname}) accomplishes his goals`,
        url: `${process.env.HOST}/${user.nickname}`,
        type: 'profile',
      },
      content: {
        ...user,
        goals,
      },
    };
  }
}
