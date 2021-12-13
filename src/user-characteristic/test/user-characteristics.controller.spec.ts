import { Test, TestingModule } from '@nestjs/testing';
import { UserCharacteristicController } from 'src/user-characteristic/user-characteristic.controller';

describe('UserCharacteristicController', () => {
  let controller: UserCharacteristicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserCharacteristicController],
    }).compile();

    controller = module.get<UserCharacteristicController>(
      UserCharacteristicController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
