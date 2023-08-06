import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { GoalModule } from 'src/goal/goal.module';
import { DayModule } from 'src/day/day.module';
import { SubscriptionModule } from 'src/subscription/subscription.module';
import { DayPointModule } from 'src/day-point/day-point.module';
import { HashtagModule } from 'src/hashtag/hashtag.module';
import { MemberModule } from 'src/member/member.module';
import { ArticleModule } from 'src/article/article.module';
import { PageController } from './page.controller';
import { PageService } from './page.service';

@Module({
  controllers: [PageController],
  providers: [PageService],
  imports: [
    UserModule,
    GoalModule,
    DayModule,
    DayPointModule,
    SubscriptionModule,
    MemberModule,
    HashtagModule,
    ArticleModule,
  ],
})
export class PageModule {}
