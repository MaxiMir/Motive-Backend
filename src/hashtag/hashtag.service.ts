import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindConditions } from 'typeorm/find-options/FindConditions';
import { Hashtag } from './hashtag.entity';

@Injectable()
export class HashtagService {
  constructor(
    @InjectRepository(Hashtag)
    private readonly goalRepository: Repository<Hashtag>,
  ) {}

  async findOne(conditions: FindConditions<Hashtag>) {
    return await this.goalRepository.findOneOrFail(conditions);
  }
}
