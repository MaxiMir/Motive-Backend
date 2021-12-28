import { Body, Controller, HttpCode, Query, Post } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Operation, OPERATIONS } from 'src/abstracts/operation';
import { ParseOperationPipe } from 'src/pipes/parse-operation.pipe';
import { SubscriptionService } from './subscription.service';
import { UpdateFollowingDto } from './dto/update-following.dto';

@Controller('subscriptions')
@ApiTags('Subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post()
  @HttpCode(204)
  @ApiOperation({ summary: 'update following' })
  @ApiQuery({ name: 'operation', enum: OPERATIONS })
  @ApiResponse({ status: 204 })
  updateFollowing(
    @Query('operation', ParseOperationPipe) operation: Operation,
    @Body() dto: UpdateFollowingDto,
  ) {
    const clientId = 1; // TODO временно

    return this.subscriptionService.updateFollowing(clientId, dto, operation);
  }
}
