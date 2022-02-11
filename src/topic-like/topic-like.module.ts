import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicLikeService } from './topic-like.service';
import { TopicLikeController } from './topic-like.controller';
import { TopicLike } from './topic-like.entity';

@Module({
  controllers: [TopicLikeController],
  providers: [TopicLikeService],
  imports: [TypeOrmModule.forFeature([TopicLike])],
  exports: [TopicLikeService],
})
export class TopicLikeModule {}
