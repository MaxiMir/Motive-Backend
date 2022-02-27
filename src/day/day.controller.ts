import { Controller, Param, Get, Patch, Post, HttpCode, Body, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Goal } from 'src/goal/entities/goal.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateDayDto } from './dto/create-day.dto';
import { Day } from './entities/day.entity';
import { DayService } from './day.service';

@Controller('days')
@ApiTags('Days')
export class DayController {
  constructor(private readonly dayService: DayService) {}

  @Post('')
  @UseGuards(AuthGuard)
  @HttpCode(201)
  @ApiOperation({ summary: 'Add day' })
  @ApiResponse({ status: 200, type: Goal })
  create(@Body() dto: CreateDayDto) {
    return this.dayService.create(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get day' })
  @ApiResponse({ status: 200, type: Day })
  getByPK(@Param('id', ParseIntPipe) id: number) {
    return this.dayService.findByPK(id, { relations: ['tasks', 'feedback'] });
  }

  @Patch(':id/views')
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 204 })
  @ApiOperation({ summary: 'Increase day views' })
  increaseViews(@Param('id', ParseIntPipe) id: number) {
    return this.dayService.increaseViews(id);
  }
}
