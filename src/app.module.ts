import * as process from 'process';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UserModule } from './user/user.module';
import { GoalModule } from './goal/goal.module';
import { UserCharacteristicModule } from './user-characteristic/user-characteristic.module';
import { FilesModule } from './file/files.module';
import { Unique } from './validators/unique';
import { PreferencesModule } from './preferences/preferences.module';
import { DayModule } from './day/day.module';
import { HashtagModule } from './hashtag/hashtag.module';
import { GoalCharacteristicModule } from './goal-characteristic/goal-characteristic.module';
import { TaskModule } from './task/task.module';

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
      synchronize: true, // TODO shouldn't be used in production - otherwise you can lose production data
      cache: true, // TODO enable caching
    }),
    UserModule,
    UserCharacteristicModule,
    PreferencesModule,
    GoalModule,
    HashtagModule,
    GoalCharacteristicModule,
    DayModule,
    TaskModule,
    FilesModule,
  ],
  controllers: [],
  providers: [Unique],
})
export class AppModule {}
