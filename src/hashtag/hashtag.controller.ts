import { Controller, Param, Get, ParseIntPipe } from '@nestjs/common';
import { HashtagService } from './hashtag.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Hashtag } from './entities/hashtag.entity';

@Controller('hashtags')
@ApiTags('Hashtags')
export class HashtagController {
  constructor(private readonly hashtagService: HashtagService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get hashtag' })
  @ApiResponse({ status: 200, type: Hashtag })
  getByPK(@Param('id', ParseIntPipe) id: number) {
    return this.hashtagService.getByPK(id);
  }
}
