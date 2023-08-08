import { Test, TestingModule } from '@nestjs/testing';
import { DayPointController } from 'src/day-point/day-point.controller';
import { DayPointService } from 'src/day-point/day-point.service';

describe('DayPointController', () => {
  let controller: DayPointController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DayPointController],
      providers: [DayPointService],
    }).compile();

    controller = module.get<DayPointController>(DayPointController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
