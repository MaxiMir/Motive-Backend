import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TaskService } from './task.service';
import { Task } from './task.entity';

@Controller('tasks')
@ApiTags('Tasks')
export class TaskController {
  constructor(private readonly hashtagService: TaskService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get task' })
  @ApiResponse({ status: 200, type: Task })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.hashtagService.findOne({ id });
  }
}
