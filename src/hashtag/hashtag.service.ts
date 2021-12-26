import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { FindConditions } from 'typeorm/find-options/FindConditions';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import { Hashtag } from './hashtag.entity';

@Injectable()
export class HashtagService {
  constructor(
    @InjectRepository(Hashtag)
    private readonly hashtagRepository: Repository<Hashtag>,
  ) {}

  async find(options?: FindManyOptions<Hashtag>) {
    return await this.hashtagRepository.find(options);
  }

  async findOne(conditions: FindConditions<Hashtag>) {
    return await this.hashtagRepository.findOneOrFail(conditions);
  }

  async upsert(names: string[]) {
    const created = await this.find({
      where: {
        name: In(names),
      },
    });

    return names.map((name) => {
      const hashtag = created.find((h) => h.name === name);

      if (hashtag) {
        return hashtag;
      }

      const newHashtag = new Hashtag();
      newHashtag.name = name;

      return newHashtag;
    });
  }
}
