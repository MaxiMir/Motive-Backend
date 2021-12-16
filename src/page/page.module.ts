import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { DayModule } from 'src/day/day.module';
import { PageController } from './page.controller';

@Module({
  imports: [UserModule, DayModule],
  controllers: [PageController],
})
export class PageModule {}
