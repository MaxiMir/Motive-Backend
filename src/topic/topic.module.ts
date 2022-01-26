import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TopicController } from './topic.controller';
import { TopicService } from './topic.service';
import { Topic } from './topic.entity';

@Module({
  controllers: [TopicController],
  providers: [TopicService],
  imports: [TypeOrmModule.forFeature([Topic])],
})
export class TopicModule {}
