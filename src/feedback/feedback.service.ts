import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DayService } from 'src/day/day.service';
import { FileService } from 'src/file/file.service';
import { Feedback } from './entities/feedback.entity';
import { CreateFeedbackDto } from './dto/create-feedback.dto';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private readonly feedbackRepository: Repository<Feedback>,
    private readonly dayService: DayService,
    private readonly fileService: FileService,
  ) {}

  async save(dto: CreateFeedbackDto, photos: Express.Multer.File[]) {
    const day = await this.dayService.findByPK(dto.dayId);
    const feedback = new Feedback();
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
