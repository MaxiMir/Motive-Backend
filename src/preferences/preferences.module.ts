import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PreferencesService } from './preferences.service';
import { PreferencesController } from './preferences.controller';
import { Preferences } from './preferences.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Preferences])],
  providers: [PreferencesService],
  controllers: [PreferencesController],
})
export class PreferencesModule {}
