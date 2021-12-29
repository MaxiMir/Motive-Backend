import { Controller, Param, Get, Patch, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TaskService } from './task.service';
import { Task } from './task.entity';

@Controller('tasks')
@ApiTags('Tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get task' })
  @ApiResponse({ status: 200, type: Task })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.findByPK(id);
  }

  @Patch(':id/completed')
  @ApiOperation({ summary: 'Set a task complete' })
  @ApiResponse({ status: 204 })
  setCompleted(@Param('id', ParseIntPipe) id: number) {
    const clientId = 1; // TODO временно

    return this.taskService.setCompleted(clientId, id);
  }
}
