import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { GoalModule } from 'src/goal/goal.module';
import { DayModule } from 'src/day/day.module';
import { LikeModule } from 'src/like/like.module';
import { MarkdownService } from 'src/markown/markdown.service';
import { Topic } from './entities/topic.entity';
import { TopicController } from './topic.controller';
import { TopicService } from './topic.service';

@Module({
  controllers: [TopicController],
  providers: [TopicService, MarkdownService],
  imports: [TypeOrmModule.forFeature([Topic]), UserModule, GoalModule, DayModule, LikeModule],
})
export class TopicModule {}
