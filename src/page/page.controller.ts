import { Controller, Param, Query, Get } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/pagination.dto';
import { ApiPagination } from 'src/decorators/api-pagination.decorator';
import { Identify } from 'src/decorators/identify.decorator';
import { ParseGoalDateMapPipe } from 'src/pipes/parse-goal-date-map.pipe';
import { GoalDayDto } from 'src/goal/dto/goal-day.dto';
import { UserDto } from './dto/user.dto';
import { FollowingDto } from './dto/following.dto';
import { SearchDto } from './dto/search.dto';
import { SearchParamsDto } from './dto/search-params.dto';
import { RatingDto } from './dto/rating.dto';
import { PageService } from './page.service';

@Controller('pages')
@ApiTags('Pages')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Get('users/:nickname')
  @ApiOperation({ summary: 'Get user page' })
  @ApiParam({ name: 'nickname', example: 'maximir' })
  @ApiQuery({
    name: 'd',
    example: '314:532,214:312',
    description: 'dates for goals [goal.id]:[day.id]',
    allowEmptyValue: true,
  })
  @ApiResponse({ status: 200, type: UserDto })
  getUser(
    @Param('nickname') nickname: string,
    @Query('d', ParseGoalDateMapPipe) queryDayMap?: GoalDayDto[],
    @Identify() clientId?: number,
  ) {
    return this.pageService.findUser(nickname, clientId, queryDayMap);
  }

  @Get('following')
  @ApiOperation({ summary: 'Get following page' })
  @ApiPagination()
  @ApiResponse({ status: 200, type: FollowingDto })
  async getFollowing(@Query() query: PaginationDto, @Identify() clientId?: number) {
    return this.pageService.findFollowing(query, clientId);
  }

  @Get('rating')
  @ApiOperation({ summary: 'Get rating page' })
  @ApiResponse({ status: 200, type: RatingDto })
  getRating() {
    return this.pageService.findRating();
  }

  @Get('search')
  @ApiOperation({ summary: 'Get search page' })
  @ApiResponse({ status: 200, type: SearchDto })
  getSearch(@Query() query: SearchParamsDto) {
    return this.pageService.findSearch(query);
  }
}
