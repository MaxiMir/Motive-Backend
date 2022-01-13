import { Controller, Param, Body, UploadedFiles, ParseIntPipe, Get, Post, Patch } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiImageFiles } from 'src/decorators/api-images.decorator';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { DayService } from './day.service';
import { Day } from './day.entity';

@Controller('days')
@ApiTags('Days')
export class DayController {
  constructor(private readonly dayService: DayService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get day' })
  @ApiResponse({ status: 200, type: Day })
  getByPK(@Param('id', ParseIntPipe) id: number) {
    return this.dayService.findByPK(id);
  }

  @Patch(':id/views')
  @ApiResponse({ status: 204 })
  @ApiOperation({ summary: 'Increase day views' })
  increaseViews(@Param('id', ParseIntPipe) id: number) {
    // todo only auth
    return this.dayService.increaseViews(id);
  }

  @Post(':id/feedback')
  @ApiBody({
    schema: {
      type: 'object',
      required: [],
      properties: {
        text: { type: 'string' },
        photos: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @ApiImageFiles('photos')
  @ApiResponse({ status: 200 })
  @ApiOperation({ summary: 'Create day feedback' })
  createFeedback(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateFeedbackDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    // todo only auth + check user
    return this.dayService.createFeedback(id, dto, files);
  }
}
