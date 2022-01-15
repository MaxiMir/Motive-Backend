import { Injectable } from '@nestjs/common';

@Injectable()
export class MarkdownService {
  convert(value: string) {
    return value.replace(/(https?:\/\/[^\s]+)/g, '[$1]($1)').replace(/\\n/g, '  ');
  }
}
