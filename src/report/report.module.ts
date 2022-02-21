import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { Report } from './entities/report.entity';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';

@Module({
  controllers: [ReportController],
  providers: [ReportService],
  imports: [TypeOrmModule.forFeature([Report]), UserModule],
})
export class ReportModule {}
