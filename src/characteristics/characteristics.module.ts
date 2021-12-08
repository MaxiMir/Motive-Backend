import { Module } from '@nestjs/common';
import { CharacteristicsController } from './controllers/characteristics.controller';
import { CharacteristicsService } from './service/characteristics.service';

@Module({
  controllers: [CharacteristicsController],
  providers: [CharacteristicsService],
})
export class CharacteristicsModule {}
