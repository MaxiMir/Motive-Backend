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
import { HashtagModule } from './hashtag/hashtag.module';
import { GoalCharacteristicModule } from './goal-characteristic/goal-characteristic.module';
import { TaskModule } from './task/task.module';
import { PageModule } from './page/page.module';
import { DayCharacteristicModule } from './day-characteristic/day-characteristic.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { FeedbackModule } from './feedback/feedback.module';
import { TopicModule } from './topic/topic.module';
import { ReactionModule } from './reaction/reaction.module';
import { LikeModule } from './like/like.module';
import { ReportModule } from './report/report.module';
import { ConfirmationModule } from './confirmation/confirmation.module';
import { MemberModule } from './member/member.module';
import { SeoModule } from './seo/seo.module';

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
      subscribers: [__dirname + '/**/*.subscriber{.ts,.js}'],
      migrations: [join(__dirname, '..', 'migrations/**/*.ts')],
      synchronize: true, // TODO shouldn't be used in production - otherwise you can lose production data
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
    GoalCharacteristicModule,
    DayModule,
    TaskModule,
    FileModule,
    PageModule,
    DayCharacteristicModule,
    SubscriptionModule,
    FeedbackModule,
    TopicModule,
    ReactionModule,
    LikeModule,
    ReportModule,
    ConfirmationModule,
    MemberModule,
    SeoModule,
  ],
})
export class AppModule {}
