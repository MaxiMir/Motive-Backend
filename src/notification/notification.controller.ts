import { Controller, Get, Param, ParseIntPipe, Patch, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiPagination } from 'src/decorators/api-pagination.decorator';
import { FindQueryDto } from './dto/find-query.dto';
import { NotificationEntity } from './entities/notification.entity';
import { NotificationService } from './notification.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('notifications')
@ApiTags('Notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  @ApiOperation({ summary: 'Find notifications' })
  @ApiPagination({ name: 'where[user]', example: 1 })
  @ApiResponse({ status: 200, type: [NotificationEntity] })
  find(@Query() query: FindQueryDto) {
    return this.notificationService.find(query);
  }

  @Patch(':id/read')
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 204 })
  @ApiOperation({ summary: 'Update notification read' })
  updateRead(@Param('id', ParseIntPipe) id: number) {
    return this.notificationService.updateRead(id);
  }
}
