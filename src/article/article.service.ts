import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocaleDto } from 'src/locale/dto/locale.dto';
import { ArticleEntity } from './entities/article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {}

  getFields(locale: LocaleDto) {
    return [
      'article.id',
      'article.date',
      'article.image',
      'article.views',
      'article.pathname',
      'article.likeCount',
      'article.bookmarkedCount',
      'article.sharesCount',
      `article.${locale}`,
    ];
  }

  toLocalize(locale: LocaleDto) {
    return (article: ArticleEntity) => {
      const { [locale]: content, ...data } = article;

      return { ...data, ...content };
    };
  }

  getRepository() {
    return this.articleRepository;
  }
}
