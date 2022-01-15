import { Module } from '@nestjs/common';
import { MarkdownService } from './markdown.service';

@Module({
  providers: [MarkdownService],
})
export class MarkdownModule {}
