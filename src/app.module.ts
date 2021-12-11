import * as process from 'process';
import { ServeStaticModule } from '@nestjs/serve-static';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { GoalsModule } from './goals/goals.module';
import { CharacteristicsModule } from './characteristics/characteristics.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      exclude: ['/api*'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'example',
      database: 'postgres',
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
