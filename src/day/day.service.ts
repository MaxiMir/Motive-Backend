import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectLiteral, Repository } from 'typeorm';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { FindConditions } from 'typeorm/find-options/FindConditions';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import { Task } from 'src/task/task.entity';
import { FileService } from 'src/file/file.service';
import { MarkdownService } from 'src/markown/markdown.service';
import { CreateDayDto } from './dto/create-day.dto';
import { Day } from './day.entity';

@Injectable()
export class DayService {
  constructor(
    @InjectRepository(Day)
    private readonly dayRepository: Repository<Day>,
    private readonly fileService: FileService,
    private readonly markdownService: MarkdownService,
  ) {}

  getRepository() {
    return this.dayRepository;
  }

  create(dto: CreateDayDto) {
    const day = new Day();

    day.tasks = dto.tasks.map(({ name, date }) => {
      const task = new Task();
      task.name = this.markdownService.convert(name);

      if (date) {
        task.date = date;
      }

      return task;
    });

    return day;
  }

  async find(options?: FindManyOptions<Day>) {
    return await this.dayRepository.find(options);
  }

  async findByPK(id: number, options?: FindOneOptions<Day>) {
    return await this.dayRepository.findOneOrFail({ id }, options);
  }

  async findLastAdd(where?: FindConditions<Day> | ObjectLiteral) {
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
}
