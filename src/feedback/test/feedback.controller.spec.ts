import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackController } from 'src/feedback/feedback.controller';
import { FeedbackService } from 'src/feedback/feedback.service';

describe('FeedbackController', () => {
  let controller: FeedbackController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedbackController],
      providers: [FeedbackService],
    }).compile();

    controller = module.get<FeedbackController>(FeedbackController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
