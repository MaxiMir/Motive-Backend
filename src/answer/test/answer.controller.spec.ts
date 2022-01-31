import { Test, TestingModule } from '@nestjs/testing';
import { AnswerController } from 'src/answer/answer.controller';
import { AnswerService } from 'src/answer/answer.service';

describe('AnswerController', () => {
  let controller: AnswerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnswerController],
      providers: [AnswerService],
    }).compile();

    controller = module.get<AnswerController>(AnswerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
