import { Body, Controller, Get, Post, Query, UploadedFiles, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Identify } from 'src/decorators/identify.decorator';
import { ApiPagination } from 'src/decorators/api-pagination.decorator';
import { ApiImageFiles } from 'src/decorators/api-images.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateConfirmationDto } from './dto/create-confirmation.dto';
import { FindQueryDto } from './dto/find-query.dto';
import { Confirmation } from './entities/confirmation.entity';
import { ConfirmationService } from './confirmation.service';

@Controller('confirmations')
@ApiTags('Confirmations')
export class ConfirmationController {
  constructor(private readonly confirmationService: ConfirmationService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create confirmation' })
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
  @ApiResponse({ status: 201, type: Confirmation })
  save(
    @Body() dto: CreateConfirmationDto,
    @UploadedFiles() files: Express.Multer.File[],
    @Identify() clientId: number,
  ) {
    return this.confirmationService.save(dto, files, clientId);
  }

  @Get()
  @ApiOperation({ summary: 'Get confirmations' })
  @ApiPagination({ name: 'where[user]', example: 1 })
  @ApiResponse({ status: 200, type: [Confirmation] })
  find(@Query() query: FindQueryDto) {
    return this.confirmationService.find(query);
  }
}
