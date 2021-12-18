import { Controller, Param, ParseIntPipe, Get, Patch, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DayService } from './day.service';
import { Day } from './day.entity';

@Controller('days')
@ApiTags('Days')
export class DayController {
  constructor(private readonly dayService: DayService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get day' })
  @ApiResponse({ status: 200, type: Day })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.dayService.findByPK(id);
  }

  @Patch(':id/views')
  @HttpCode(204)
  @ApiOperation({ summary: 'Update day views' })
  @ApiResponse({ status: 204 })
  incrementViews(@Param('id', ParseIntPipe) id: number) {
    return this.dayService.incrementViews(id);
  }
}
