import { Controller, Param, Get, Patch, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Identify } from 'src/decorators/identify.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { TaskEntity } from './entities/task.entity';
import { TaskService } from './task.service';

@Controller('tasks')
@ApiTags('Tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get task' })
  @ApiResponse({ status: 200, type: TaskEntity })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.findByPK(id);
  }

  @Patch(':id/completed')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Set a task complete' })
  @ApiResponse({ status: 200, type: TaskEntity })
  updateCompleted(@Param('id', ParseIntPipe) id: number, @Identify() clientId: number) {
    return this.taskService.updateCompleted(id, clientId);
  }
}
