import { Body, Controller, UploadedFiles, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiImageFiles } from 'src/decorators/api-images.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { FeedbackEntity } from './entities/feedback.entity';
import { FeedbackService } from './feedback.service';

@Controller('feedback')
@ApiTags('Feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  @UseGuards(AuthGuard)
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
  @ApiResponse({ status: 201, type: FeedbackEntity })
  @ApiOperation({ summary: 'Create feedback' })
  create(@Body() dto: CreateFeedbackDto, @UploadedFiles() files: Express.Multer.File[]) {
    return this.feedbackService.create(dto, files);
  }
}
