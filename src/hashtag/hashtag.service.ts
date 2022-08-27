import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HashtagEntity } from './entities/hashtag.entity';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';

@Injectable()
export class HashtagService {
  constructor(
    @InjectRepository(HashtagEntity)
    private readonly hashtagRepository: Repository<HashtagEntity>,
  ) {}

  find(options?: FindManyOptions<HashtagEntity>) {
    return this.hashtagRepository.find(options);
  }
}
