import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ParseStringPipe } from 'src/pipes/parse-string.pipe';
import { ObjectToNumbersArrayPipe } from 'src/pipes/object-to-numbers-array.pipe';
import { User } from 'src/user/user.entity';
import { PageService } from './page.service';

@Controller('pages')
@ApiTags('Pages')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Get('/users/:nickname')
  @ApiOperation({ summary: 'Get user by nickname' })
  @ApiResponse({ status: 200, type: User })
  @ApiQuery({
    name: 'd',
    example: '{"314": "532"}',
    description: 'load dates for goals {[goal.id]: [day.id]}',
    allowEmptyValue: true,
  })
  async findOne(
    @Param('nickname') nickname: string,
    @Query('d', ParseStringPipe, ObjectToNumbersArrayPipe) goalsMap,
  ) {
    return await this.pageService.findUserPage(nickname, goalsMap);
  }
}
