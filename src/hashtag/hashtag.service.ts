import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindConditions } from 'typeorm/find-options/FindConditions';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import { Hashtag } from './entities/hashtag.entity';

@Injectable()
export class HashtagService {
  constructor(
    @InjectRepository(Hashtag)
    private readonly hashtagRepository: Repository<Hashtag>,
  ) {}

  find(options?: FindManyOptions<Hashtag>) {
    return this.hashtagRepository.find(options);
  }

  findOne(conditions: FindConditions<Hashtag>) {
    return this.hashtagRepository.findOneOrFail(conditions);
  }
}
