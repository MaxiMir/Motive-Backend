import { Body, Controller, HttpCode, Query, Patch } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Operation, OPERATIONS } from 'src/abstracts/operation';
import { ParseOperationPipe } from 'src/pipes/parse-operation.pipe';
import { SubscriptionService } from './subscription.service';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';

@Controller('subscriptions')
@ApiTags('Subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Patch()
  @HttpCode(204)
  @ApiOperation({ summary: 'Update subscription' })
  @ApiQuery({ name: 'operation', enum: OPERATIONS })
  @ApiResponse({ status: 204 })
  update(@Body() dto: UpdateSubscriptionDto, @Query('operation', ParseOperationPipe) operation: Operation) {
    const clientId = 1; // TODO временно

    return this.subscriptionService.update(clientId, dto, operation);
  }
}
