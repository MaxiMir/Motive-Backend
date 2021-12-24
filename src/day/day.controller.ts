import { Controller, Param, ParseIntPipe, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateDayDto } from './dto/create.day.dto';
import { DayService } from './day.service';
import { Day } from './day.entity';

@Controller('days')
@ApiTags('Days')
export class DayController {
  constructor(private readonly dayService: DayService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get day' })
  @ApiResponse({ status: 200, type: Day })
  getByPK(@Param('id', ParseIntPipe) id: number) {
    return this.dayService.findByPK(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create day' })
  @ApiResponse({ status: 201, type: Day })
  create(@Query() dto: CreateDayDto) {
    return this.dayService.save(dto);
  }
}
