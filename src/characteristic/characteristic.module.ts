import { Module } from '@nestjs/common';
import { CharacteristicController } from './characteristic.controller';
import { CharacteristicService } from './characteristic.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Characteristic } from './characteristic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Characteristic])],
  providers: [CharacteristicService],
  controllers: [CharacteristicController],
})
export class CharacteristicModule {}
