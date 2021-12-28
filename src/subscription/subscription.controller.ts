import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Operation, OPERATIONS } from 'src/abstracts/operation';
import { ParseOperationPipe } from 'src/pipes/parse-operation.pipe';
import { SubscriptionService } from './subscription.service';
import { UpdateFollowingDto } from './dto/update-following.dto';

@Controller('subscriptions')
@ApiTags('Subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post(':operation')
  @HttpCode(204)
  @ApiOperation({ summary: 'update following' })
  @ApiParam({ name: 'operation', enum: OPERATIONS })
  @ApiResponse({ status: 204 })
  updateFollowing(
    @Param('operation', ParseOperationPipe) operation: Operation,
    @Body() dto: UpdateFollowingDto,
  ) {
    const clientId = 1; // TODO временно

    return this.subscriptionService.updateFollowing(clientId, dto, operation);
  }
}
