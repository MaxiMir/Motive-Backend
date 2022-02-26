import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Identify } from 'src/decorators/identify.decorator';
import { UserBaseDto } from 'src/user/dto/user-base.dto';
import { CreateReportDto } from './dto/create-report.dto';
import { Report } from './entities/report.entity';
import { ReportService } from './report.service';

@Controller('reports')
@ApiTags('Reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  @ApiOperation({ summary: 'Create report' })
  @ApiResponse({ status: 201, type: Report })
  create(@Body() createReportDto: CreateReportDto, @Identify() client: UserBaseDto) {
    return this.reportService.create(createReportDto, client.id);
  }
}
