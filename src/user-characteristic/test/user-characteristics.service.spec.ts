import { Test, TestingModule } from '@nestjs/testing';
import { UserCharacteristicService } from 'src/user-characteristic/user-characteristic.service';

describe('UserCharacteristicService', () => {
  let service: UserCharacteristicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserCharacteristicService],
    }).compile();

    service = module.get<UserCharacteristicService>(UserCharacteristicService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
