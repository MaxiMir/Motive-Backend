import {
  Body,
  Controller,
  HttpCode,
  Query,
  Param,
  Get,
  Patch,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/pagination.dto';
import { OperationDto, OPERATIONS } from 'src/common/operation.dto';
import { ApiPagination } from 'src/decorators/api-pagination.decorator';
import { Identify } from 'src/decorators/identify.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { ParseOperationPipe } from 'src/pipes/parse-operation-pipe.service';
import { UserWithCharacteristicEntity } from 'src/user/entities/user-with-characteristic.entity';
import { SubscriptionService } from './subscription.service';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';

@Controller('subscriptions')
@ApiTags('Subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get(':id/followers')
  @ApiOperation({ summary: 'Get followers' })
  @ApiPagination()
  @ApiResponse({ status: 200, type: [UserWithCharacteristicEntity] })
  getFollowers(@Param('id', ParseIntPipe) id: number, @Query() query: PaginationDto) {
    return this.subscriptionService.findFollowers(id, query);
  }

  @Get(':id/following')
  @ApiOperation({ summary: 'Get following' })
  @ApiPagination()
  @ApiResponse({ status: 200, type: [UserWithCharacteristicEntity] })
  getFollowing(@Param('id', ParseIntPipe) id: number, @Query() query: PaginationDto) {
    return this.subscriptionService.findFollowing(id, query);
  }

  @Patch()
  @UseGuards(AuthGuard)
  @HttpCode(204)
  @ApiOperation({ summary: 'Update subscription' })
  @ApiQuery({ name: 'operation', enum: OPERATIONS })
  @ApiResponse({ status: 204 })
  update(
    @Body() dto: UpdateSubscriptionDto,
    @Query('operation', ParseOperationPipe) operation: OperationDto,
    @Identify() clientId: number,
  ) {
    return this.subscriptionService.update(dto, operation, clientId);
  }
}
