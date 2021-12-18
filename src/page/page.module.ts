import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { DayModule } from 'src/day/day.module';
import { PageController } from './page.controller';
import { PageService } from './page.service';

@Module({
  imports: [UserModule, DayModule],
  providers: [PageService],
  controllers: [PageController],
})
export class PageModule {}
