import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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
  create(@Body() createReportDto: CreateReportDto) {
    const clientId = 1; // TODO временно

    return this.reportService.create(clientId, createReportDto);
  }
}
