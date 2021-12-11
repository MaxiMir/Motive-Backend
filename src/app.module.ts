import * as process from 'process';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UsersModule } from './users/users.module';
import { GoalsModule } from './goals/goals.module';
import { CharacteristicsModule } from './characteristics/characteristics.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MulterModule.register({ dest: './temp' }),
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
    UsersModule,
    CharacteristicsModule,
    GoalsModule,
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
