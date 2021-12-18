import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { HashtagService } from './hashtag.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Hashtag } from './hashtag.entity';

@Controller('hashtags')
@ApiTags('Hashtags')
export class HashtagController {
  constructor(private readonly hashtagService: HashtagService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get hashtag' })
  @ApiResponse({ status: 200, type: Hashtag })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.hashtagService.findOne({ id });
  }
}
