import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { Page } from './page.entity';

@Injectable()
export class PageService extends TypeOrmCrudService<Page> {
  constructor(
    @InjectRepository(Page)
    private pageRepository: Repository<Page>,
  ) {
    super(pageRepository);
  }
}
