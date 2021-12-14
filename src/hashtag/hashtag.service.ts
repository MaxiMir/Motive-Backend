import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hashtag } from './hashtag.entity';

@Injectable()
export class HashtagService {
  constructor(
    @InjectRepository(Hashtag)
    private goalRepository: Repository<Hashtag>,
  ) {}

  async findOne(id: number) {
    return await this.goalRepository.find({ id });
  }
}
