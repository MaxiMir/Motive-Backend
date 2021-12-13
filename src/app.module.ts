import * as process from 'process';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UserModule } from './user/user.module';
import { GoalModule } from './goal/goal.module';
import { CharacteristicModule } from './characteristic/characteristic.module';
import { FilesModule } from './file/files.module';
import { Unique } from './validators/unique';
import { PreferencesModule } from './preferences/preferences.module';

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
    }),
    UserModule,
    CharacteristicModule,
    GoalModule,
    FilesModule,
    PreferencesModule,
  ],
  controllers: [],
  providers: [Unique],
})
export class AppModule {}
