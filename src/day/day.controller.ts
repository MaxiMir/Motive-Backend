import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
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
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.dayService.findOne(id);
  }
}
