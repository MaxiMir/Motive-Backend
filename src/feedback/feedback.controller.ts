import { Body, Controller, UploadedFiles, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiImageFiles } from 'src/decorators/api-images.decorator';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { FeedbackService } from './feedback.service';

@Controller('feedback')
@ApiTags('Feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
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
  @ApiOperation({ summary: 'Create feedback' })
  createFeedback(@Body() dto: CreateFeedbackDto, @UploadedFiles() files: Express.Multer.File[]) {
    // todo only auth + check user
    return this.feedbackService.save(dto, files);
  }
}
