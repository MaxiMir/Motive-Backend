import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { SeoService } from './seo.service';
import { SeoController } from './seo.controller';

@Module({
  controllers: [SeoController],
  providers: [SeoService],
  imports: [UserModule],
})
export class SeoModule {}
