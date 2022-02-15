import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, Min } from 'class-validator';
import { ReportTypeDto } from './report-type.dto';
import { ReasonTypeDto } from './reason-type.dto';

export class CreateReportDto {
  @IsNumber()
  @Min(1)
  @ApiProperty({
    example: 21,
  })
  readonly entityId: number;

  @IsEnum(ReportTypeDto)
  readonly type: ReportTypeDto;

  @IsEnum(ReasonTypeDto)
  readonly reason: ReasonTypeDto;
}
