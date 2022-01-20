import { Body, Controller, HttpCode, Query, Patch } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Operation, OPERATIONS } from 'src/abstracts/operation';
import { ParseOperationPipe } from 'src/pipes/parse-operation.pipe';
import { SubscriptionService } from './subscription.service';
import { UpdateFollowingDto } from './dto/update-following.dto';

@Controller('subscriptions')
@ApiTags('Subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Patch()
  @HttpCode(204)
  @ApiOperation({ summary: 'Update following' })
  @ApiQuery({ name: 'operation', enum: OPERATIONS })
  @ApiResponse({ status: 204 })
  updateFollowing(
    @Body() dto: UpdateFollowingDto,
    @Query('operation', ParseOperationPipe) operation: Operation,
  ) {
    const clientId = 1; // TODO временно

    return this.subscriptionService.updateFollowing(clientId, dto, operation);
  }
}
