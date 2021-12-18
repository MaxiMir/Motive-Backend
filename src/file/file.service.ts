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
      const fileName = `${uuid.v4()}.webp`;
      await sharp(file.buffer).resize(options).webp().toFile(join('client', 'avatars', fileName));

      return join('/', 'avatars', fileName);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
