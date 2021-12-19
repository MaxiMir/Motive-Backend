import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ParseGoalDateMapPipe } from 'src/pipes/parse-goal-date-map.pipe';
import { GoalDateDto } from 'src/goal/dto/goal-date.dto';
import { UserPageDto } from './dto/user-page.dto';
import { FavoritesPageDto } from './dto/favorites-page.dto';
import { PageService } from './page.service';

@Controller('pages')
@ApiTags('Pages')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Get('main')
  @ApiOperation({ summary: 'Get main page' })
  @ApiResponse({ status: 200 })
  async getMain() {
    return {}; // TODO
  }

  @Get('users/:nickname')
  @ApiOperation({ summary: 'Get user page' })
  @ApiParam({ name: 'nickname', example: 'maximir' })
  @ApiQuery({
    name: 'd',
    example: '314:532,214:312',
    description: 'dates for goals [goal.id]:[day.id]',
    allowEmptyValue: true,
  })
  @ApiResponse({ status: 200, type: UserPageDto })
  getUser(
    @Param('nickname') nickname: string,
    @Query('d', ParseGoalDateMapPipe) goalDatesMap?: GoalDateDto[],
  ) {
    return this.pageService.findUser(nickname, goalDatesMap);
  }

  @Get('favorites')
  @ApiOperation({ summary: 'Get favorites page' })
  @ApiResponse({ status: 200, type: FavoritesPageDto })
  getFavorites() {
    return this.pageService.findFavorites();
  }
}
