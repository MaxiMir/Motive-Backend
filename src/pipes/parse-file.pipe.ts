import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseFile implements PipeTransform {
  transform(
    files: Express.Multer.File | Express.Multer.File[],
  ): Express.Multer.File | Express.Multer.File[] {
    if (!files) {
      throw new BadRequestException('Validation failed (file expected)');
    }

    if (Array.isArray(files) && !files.length) {
      throw new BadRequestException('Validation failed (files expected)');
    }

    return files;
  }
}
