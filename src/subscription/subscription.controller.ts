import { Body, Controller, HttpCode, Query, Param, Get, Patch, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Pagination } from 'src/abstracts/pagination';
import { Operation, OPERATIONS } from 'src/abstracts/operation';
import { ApiPagination } from 'src/decorators/api-pagination.decorator';
import { Identify } from 'src/decorators/identify.decorator';
import { ParseOperationPipe } from 'src/pipes/parse-operation.pipe';
import { UserWithCharacteristicDto } from 'src/user/dto/user-with-characteristic.dto';
import { UserBaseDto } from 'src/user/dto/user-base.dto';
import { SubscriptionService } from './subscription.service';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';

@Controller('subscriptions')
@ApiTags('Subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get(':id/followers')
  @ApiOperation({ summary: 'Get followers' })
  @ApiPagination()
  @ApiResponse({ status: 200, type: [UserWithCharacteristicDto] })
  getFollowers(@Param('id', ParseIntPipe) id: number, @Query() query: Pagination) {
    return this.subscriptionService.findFollowers(id, query);
  }

  @Get(':id/following')
  @ApiOperation({ summary: 'Get following' })
  @ApiPagination()
  @ApiResponse({ status: 200, type: [UserWithCharacteristicDto] })
  getFollowing(@Param('id', ParseIntPipe) id: number, @Query() query: Pagination) {
    return this.subscriptionService.findFollowing(id, query);
  }

  @Patch()
  @HttpCode(204)
  @ApiOperation({ summary: 'Update subscription' })
  @ApiQuery({ name: 'operation', enum: OPERATIONS })
  @ApiResponse({ status: 204 })
  update(
    @Body() dto: UpdateSubscriptionDto,
    @Query('operation', ParseOperationPipe) operation: Operation,
    @Identify() client: UserBaseDto,
  ) {
    return this.subscriptionService.update(dto, operation, client.id);
  }
}
