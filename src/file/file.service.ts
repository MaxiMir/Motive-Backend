import { join } from 'path';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import * as sharp from 'sharp';

const ROOT_FOLDER = 'client';

@Injectable()
export class FileService {
  async uploadImage(file: Express.Multer.File, folder: string, options: { width?: number; height?: number }) {
    try {
      const fileName = `${uuid.v4()}.webp`;
      await sharp(file.buffer).resize(options).webp().toFile(join(ROOT_FOLDER, folder, fileName));

      return join('/', folder, fileName);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private calculateAspectRatio = (width, height) => {
    const divisor = getDivisor(width, height);

    function getDivisor(a, b) {
      return !b ? a : getDivisor(b, a % b);
    }

    return [width / divisor, height / divisor];
  };

  async getImageRatio(file: Express.Multer.File) {
    try {
      const meta = await sharp(file.buffer).metadata();

      return this.calculateAspectRatio(meta.width, meta.height);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
