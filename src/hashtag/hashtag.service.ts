import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hashtag } from './entities/hashtag.entity';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';

@Injectable()
export class HashtagService {
  constructor(
    @InjectRepository(Hashtag)
    private readonly hashtagRepository: Repository<Hashtag>,
  ) {}

  find(options?: FindManyOptions<Hashtag>) {
    return this.hashtagRepository.find(options);
  }
}
