import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { GoalModule } from 'src/goal/goal.module';
import { PageService } from './page.service';
import { PageController } from './page.controller';

@Module({
  providers: [PageService],
  controllers: [PageController],
  imports: [UserModule, GoalModule],
})
export class PageModule {}
