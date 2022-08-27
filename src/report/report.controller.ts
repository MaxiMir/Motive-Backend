import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Identify } from 'src/decorators/identify.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateReportDto } from './dto/create-report.dto';
import { ReportEntity } from './entities/report.entity';
import { ReportService } from './report.service';

@Controller('reports')
@ApiTags('Reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create report' })
  @ApiResponse({ status: 201, type: ReportEntity })
  create(@Body() createReportDto: CreateReportDto, @Identify() clientId: number) {
    return this.reportService.create(createReportDto, clientId);
  }
}
