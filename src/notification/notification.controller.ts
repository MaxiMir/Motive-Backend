import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiPagination } from 'src/decorators/api-pagination.decorator';
import { FindQueryDto } from './dto/find-query.dto';
import { Notification } from './entities/notification.entity';
import { NotificationService } from './notification.service';

@Controller('notifications')
@ApiTags('Notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  @ApiOperation({ summary: 'Find notifications' })
  @ApiPagination({ name: 'where[user]', example: 1 })
  @ApiResponse({ status: 200, type: [Notification] })
  find(@Query() query: FindQueryDto) {
    return this.notificationService.find(query);
  }
}
