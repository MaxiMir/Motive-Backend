import { Controller } from '@nestjs/common';
import { GoalCharacteristicService } from './goal-characteristic.service';

@Controller('goal-characteristic')
export class GoalCharacteristicController {
  constructor(
    private readonly goalCharacteristicService: GoalCharacteristicService,
  ) {}
}
