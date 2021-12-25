import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { DayModule } from 'src/day/day.module';
import { PageController } from './page.controller';
import { PageService } from './page.service';

@Module({
  controllers: [PageController],
  providers: [PageService],
  imports: [UserModule, DayModule],
})
export class PageModule {}
