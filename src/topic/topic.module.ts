import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TopicController } from './topic.controller';
import { UserModule } from 'src/user/user.module';
import { GoalModule } from 'src/goal/goal.module';
import { DayModule } from 'src/day/day.module';
import { MarkdownService } from 'src/markown/markdown.service';
import { TopicService } from './topic.service';
import { Topic } from './topic.entity';

@Module({
  controllers: [TopicController],
  providers: [TopicService, MarkdownService],
  imports: [TypeOrmModule.forFeature([Topic]), UserModule, GoalModule, DayModule],
})
export class TopicModule {}
