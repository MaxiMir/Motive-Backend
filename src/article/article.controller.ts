import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('article')
@ApiTags('Article')
export class ArticleController {}
