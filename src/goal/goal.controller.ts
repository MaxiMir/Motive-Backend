import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GoalService } from './goal.service';
import { Goal } from './goal.entity';

@Controller('users')
@ApiTags('Goals')
export class GoalController {
  constructor(public service: GoalService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get goal' })
  @ApiResponse({ status: 200, type: Goal })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }
}
