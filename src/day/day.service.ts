import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectLiteral, Repository } from 'typeorm';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { FindConditions } from 'typeorm/find-options/FindConditions';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import { Markdown } from 'src/tools/mardown';
import { Task } from 'src/task/task.entity';
import { Feedback } from 'src/feedback/feedback.entity';
import { FileService } from 'src/file/file.service';
import { CreateDayDto } from './dto/create-day.dto';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { Day } from './day.entity';

@Injectable()
export class DayService {
  constructor(
    @InjectRepository(Day)
    private readonly dayRepository: Repository<Day>,
    private readonly fileService: FileService,
  ) {}

  getRepository() {
    return this.dayRepository;
  }

  create(dto: CreateDayDto) {
    const day = new Day();

    day.tasks = dto.tasks.map(({ name, date }) => {
      const task = new Task();
      task.name = Markdown.convert(name);
      task.date = date;

      return task;
    });

    return day;
  }

  async find(options?: FindManyOptions<Day>) {
    return await this.dayRepository.find(options);
  }

  async findByPK(id: number, options?: FindOneOptions<Day>) {
    await new Promise((r) => setTimeout(r, 1000));
    return await this.dayRepository.findOneOrFail({ id }, options);
  }

  async findLast(where?: FindConditions<Day> | ObjectLiteral) {
    const [day] = await this.dayRepository.find({
      where,
      order: {
        id: 'DESC',
      },
      take: 1,
    });

    return day;
  }

  async increaseViews(id: number) {
    const day = await this.findByPK(id);
    day.views += 1;

    await this.dayRepository.save(day);
  }

  async createFeedback(id: number, dto: CreateFeedbackDto, photos: Express.Multer.File[]) {
    const day = await this.findByPK(id);
    const feedback = new Feedback();

    if (dto.text) {
      feedback.text = Markdown.convert(dto.text);
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

    day.feedback = feedback;
    return await this.dayRepository.save(day);
  }
}
