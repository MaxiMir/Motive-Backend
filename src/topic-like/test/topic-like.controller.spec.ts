import { Test, TestingModule } from '@nestjs/testing';
import { TopicLikeController } from 'src/topic-like/topic-like.controller';
import { TopicLikeService } from 'src/topic-like/topic-like.service';

describe('LikeController', () => {
  let controller: TopicLikeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TopicLikeController],
      providers: [TopicLikeService],
    }).compile();

    controller = module.get<TopicLikeController>(TopicLikeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
