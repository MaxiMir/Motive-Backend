import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DayService } from 'src/day/day.service';
import { FileService } from 'src/file/file.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { FeedbackEntity } from './entities/feedback.entity';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(FeedbackEntity)
    private readonly feedbackRepository: Repository<FeedbackEntity>,
    private readonly dayService: DayService,
    private readonly fileService: FileService,
  ) {}

  async save(dto: CreateFeedbackDto, photos: Express.Multer.File[]) {
    const day = await this.dayService.findByPK(dto.dayId, { relations: ['goal', 'goal.owner'] });
    const feedback = new FeedbackEntity();
    feedback.day = day;

    if (dto.text) {
      feedback.text = dto.text;
    }

    if (photos.length) {
      feedback.photos = await this.fileService.uploadAndMeasureImages(photos, 'feedback');
    }

    return await this.feedbackRepository.save(feedback);
  }
}
