import { Controller, Param, Get, Patch, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Identify } from 'src/decorators/identify.decorator';
import { UserBaseDto } from 'src/user/dto/user-base.dto';
import { Task } from './entities/task.entity';
import { TaskService } from './task.service';

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
  @ApiResponse({ status: 200, type: Task })
  updateCompleted(@Param('id', ParseIntPipe) id: number, @Identify() client: UserBaseDto) {
    return this.taskService.updateCompleted(id, client.id);
  }
}
