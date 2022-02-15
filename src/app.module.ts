import * as process from 'process';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UserModule } from './user/user.module';
import { GoalModule } from './goal/goal.module';
import { UserCharacteristicModule } from './user-characteristic/user-characteristic.module';
import { FilesModule } from './file/files.module';
import { DayModule } from './day/day.module';
import { HashtagModule } from './hashtag/hashtag.module';
import { GoalCharacteristicModule } from './goal-characteristic/goal-characteristic.module';
import { TaskModule } from './task/task.module';
import { PageModule } from './page/page.module';
import { DayCharacteristicModule } from './day-characteristic/day-characteristic.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { FeedbackModule } from './feedback/feedback.module';
import { MarkdownModule } from './markown/markdown.module';
import { TopicModule } from './topic/topic.module';
import { ReactionModule } from './reaction/reaction.module';
import { LikeModule } from './like/like.module';
import { LikeSubscriber } from './like/like.subcriber';
import { ReportModule } from './report/report.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MulterModule.register(),
    ServeStaticModule.forRoot({
      exclude: ['/api*'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      subscribers: [LikeSubscriber],
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
    FilesModule,
    PageModule,
    DayCharacteristicModule,
    SubscriptionModule,
    FeedbackModule,
    MarkdownModule,
    TopicModule,
    ReactionModule,
    LikeModule,
    ReportModule,
  ],
})
export class AppModule {}
