import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserCharacteristicService } from './user-characteristic.service';
import { Goal } from '../goal/goal.entity';

@Controller('user-characteristics')
@ApiTags('User Characteristics')
export class UserCharacteristicController {
  constructor(private readonly userCharacteristicService: UserCharacteristicService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get user characteristic' })
  @ApiResponse({ status: 200, type: Goal })
  getByPK(@Param('id', ParseIntPipe) id: number) {
    return this.userCharacteristicService.findByPK(id);
  }
}
