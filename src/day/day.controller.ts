import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DayService } from './day.service';

@Controller('days')
@ApiTags('Days')
export class DayController {
  constructor(private readonly dayService: DayService) {}
}
