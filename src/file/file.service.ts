import { join } from 'path';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import * as sharp from 'sharp';

@Injectable()
export class FileService {
  async create(file: Express.Multer.File): Promise<string> {
    try {
      const filePath = join(process.env.AVATAR_STORAGE, `${uuid.v4()}.webp`);
      await sharp(file.buffer).resize({ width: 500 }).webp().toFile(filePath);

      return filePath;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
