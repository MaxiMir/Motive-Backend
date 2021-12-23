import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ParseGoalDateMapPipe } from 'src/pipes/parse-goal-date-map.pipe';
import { GoalDateDto } from 'src/goal/dto/goal-date.dto';
import { UserPageDto } from './dto/user-page.dto';
import { FavoritesDto } from './dto/favorites.dto';
import { UserFollowersDto } from './dto/user-followers.dto';
import { RatingDto } from './dto/rating.dto';
import { MainDto } from './dto/main.dto';
import { PageService } from './page.service';

@Controller('pages')
@ApiTags('Pages')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Get('main')
  @ApiOperation({ summary: 'Get main page' })
  @ApiResponse({ status: 200, type: MainDto })
  async getMain() {
    return {
      client: {},
    };
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

  @Get('users/:nickname/followers')
  @ApiOperation({ summary: 'Get followers' })
  @ApiParam({ name: 'nickname', example: 'maximir' })
  @ApiResponse({ status: 200, type: UserFollowersDto })
  getUserFollowers(@Param('nickname') nickname: string) {
    return this.pageService.findFollowers(nickname);
  }

  @Get('following')
  @ApiOperation({ summary: 'Get following page' })
  @ApiResponse({ status: 200, type: FavoritesDto })
  getFollowing() {
    const id = 1; // TODO временно
    return this.pageService.findFollowing(id);
  }

  @Get('rating')
  @ApiOperation({ summary: 'Get rating page' })
  @ApiResponse({ status: 200, type: RatingDto })
  getRating() {
    return this.pageService.findRating();
  }
}
