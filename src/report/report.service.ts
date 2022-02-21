import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { CreateReportDto } from './dto/create-report.dto';
import { Report } from './entities/report.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
    private readonly userService: UserService,
  ) {}

  async create(userId: number, dto: CreateReportDto) {
    const user = await this.userService.findByPK(userId);
    const report = new Report();
    report.entityId = dto.entityId;
    report.type = dto.type;
    report.reason = dto.reason;
    report.user = user;

    return this.reportRepository.save(report);
  }
}
