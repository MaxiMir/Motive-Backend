import { Controller, Get, Param, ParseArrayPipe, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GoalDateMapPipe } from './pipes/goal-date-map.pipe';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { DayService } from 'src/day/day.service';

@Controller('pages')
@ApiTags('Pages')
export class PageController {
  constructor(private readonly userService: UserService, private readonly dayService: DayService) {}

  @Get('/users/:nickname')
  @ApiOperation({ summary: 'Get user by nickname' })
  @ApiResponse({ status: 200, type: User })
  @ApiQuery({
    name: 'd',
    example: '314:532,214:312',
    description: 'dates for goals [goal.id]:[day.id]',
    allowEmptyValue: true,
  })
  async findOne(
    @Param('nickname') nickname: string,
    @Query('d', new ParseArrayPipe({ items: String, separator: ',' }), GoalDateMapPipe)
    goalDatesMap,
  ) {
    const user = await this.userService.findOne(nickname, {
      relations: ['characteristic', 'preferences', 'goals'],
    });
    const goals = await Promise.all(
      user.goals.map(async (goal) => ({
        ...goal,
        day: await (goalDatesMap[goal.id]
          ? this.dayService.findOne(goalDatesMap[goal.id])
          : this.dayService.findLast(goal.id)),
      })),
    );

    return {
      content: {
        ...user,
        goals,
      },
    };
  }
}
