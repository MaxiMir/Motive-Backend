import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DayService } from 'src/day/day.service';
import { MarkdownService } from 'src/markown/markdown.service';
import { FileService } from 'src/file/file.service';
import { Feedback } from './feedback.entity';
import { CreateFeedbackDto } from './dto/create-feedback.dto';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private readonly feedbackRepository: Repository<Feedback>,
    private readonly dayService: DayService,
    private readonly fileService: FileService,
    private readonly markdownService: MarkdownService,
  ) {}

  async create(dto: CreateFeedbackDto, photos: Express.Multer.File[]) {
    const day = await this.dayService.findByPK(dto.dayId);
    const feedback = new Feedback();

    feedback.day = day;

    if (dto.text) {
      feedback.text = this.markdownService.convert(dto.text);
    }

    if (photos.length) {
      feedback.photos = await Promise.all(
        photos.map(async (photo) => {
          const [width, height] = await this.fileService.getImageRatio(photo);
          const src = await this.fileService.uploadImage(photo, 'feedback', { width: 1280 });

          return { src, width, height };
        }),
      );
    }

    return await this.feedbackRepository.save(feedback);
  }
}
