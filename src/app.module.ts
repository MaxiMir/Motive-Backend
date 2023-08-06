import * as process from 'process';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ScheduleModule } from '@nestjs/schedule';
import { UserModule } from './user/user.module';
import { GoalModule } from './goal/goal.module';
import { UserCharacteristicModule } from './user-characteristic/user-characteristic.module';
import { FileModule } from './file/file.module';
import { DayModule } from './day/day.module';
import { DayPointModule } from './day-point/day-point.module';
import { HashtagModule } from './hashtag/hashtag.module';
import { TaskModule } from './task/task.module';
import { PageModule } from './page/page.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { FeedbackModule } from './feedback/feedback.module';
import { TopicModule } from './topic/topic.module';
import { LikeModule } from './like/like.module';
import { ReportModule } from './report/report.module';
import { ConfirmationModule } from './confirmation/confirmation.module';
import { MemberModule } from './member/member.module';
import { SeoModule } from './seo/seo.module';
import { NotificationModule } from './notification/notification.module';
import { EventsGateway } from './events/events.gateway';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    MulterModule.register(),
    ServeStaticModule.forRoot({
      exclude: ['/api*'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      migrations: [join(__dirname, '..', 'migrations/**/*.ts')],
      synchronize: true,
      dropSchema: false,
      logging: false,
      cli: {
        entitiesDir: 'src',
        migrationsDir: 'migrations',
        subscribersDir: 'subscriber',
      },
    }),
    UserModule,
    UserCharacteristicModule,
    GoalModule,
    HashtagModule,
    DayModule,
    DayPointModule,
    TaskModule,
    FileModule,
    PageModule,
    SubscriptionModule,
    FeedbackModule,
    TopicModule,
    LikeModule,
    ReportModule,
    ConfirmationModule,
    MemberModule,
    SeoModule,
    NotificationModule,
    ArticleModule,
  ],
  providers: [EventsGateway],
})
export class AppModule {}
