import { join } from 'path';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import * as sharp from 'sharp';

@Injectable()
export class FileService {
  async uploadImage(
    file: Express.Multer.File,
    options: { width?: number; height?: number },
  ): Promise<string> {
    try {
      const filePath = join(process.env.AVATAR_STORAGE as string, `${uuid.v4()}.webp`);
      await sharp(file.buffer).resize(options).webp().toFile(filePath);

      return filePath;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
