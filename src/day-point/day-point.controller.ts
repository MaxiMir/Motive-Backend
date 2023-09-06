import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiPagination } from 'src/decorators/api-pagination.decorator';
import { FindQueryDto } from './dto/find-query.dto';
import { DayPointEntity } from './entities/day-point.entity';
import { DayPointService } from './day-point.service';

@Controller('day-points')
@ApiTags('Day Points')
export class DayPointController {
  constructor(private readonly dayPointService: DayPointService) {}

  @Get()
  @ApiOperation({ summary: 'Get day points' })
  @ApiPagination({ name: 'where[day]', example: 1 })
  @ApiResponse({ status: 200, type: [DayPointEntity] })
  find(@Query() query: FindQueryDto) {
    return this.dayPointService.find(query);
  }
}
