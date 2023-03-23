import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { GoalModule } from 'src/goal/goal.module';
import { DayModule } from 'src/day/day.module';
import { SubscriptionModule } from 'src/subscription/subscription.module';
import { ReactionModule } from 'src/reaction/reaction.module';
import { HashtagModule } from 'src/hashtag/hashtag.module';
import { MemberModule } from 'src/member/member.module';
import { BlogModule } from 'src/blog/blog.module';
import { PageController } from './page.controller';
import { PageService } from './page.service';

@Module({
  controllers: [PageController],
  providers: [PageService],
  imports: [
    UserModule,
    GoalModule,
    DayModule,
    SubscriptionModule,
    ReactionModule,
    MemberModule,
    HashtagModule,
    BlogModule,
  ],
})
export class PageModule {}
