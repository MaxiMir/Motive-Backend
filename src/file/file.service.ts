import { join } from 'path';
import { existsSync, unlinkSync } from 'fs';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import * as sharp from 'sharp';

@Injectable()
export class FileService {
  static ROOT_FOLDER = 'client';
  static STATIC_FOLDER = 'static';

  async uploadImage(file: Express.Multer.File, folder: string, options: { width?: number; height?: number }) {
    try {
      const fileName = `${uuid.v4()}.webp`;
      const staticPath = join('/', FileService.STATIC_FOLDER, folder, fileName);
      await sharp(file.buffer).resize(options).webp().toFile(join(FileService.ROOT_FOLDER, staticPath));

      return staticPath;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  removeImage(relativePath: string) {
    const file = join(FileService.ROOT_FOLDER, relativePath);

    if (!existsSync(file)) {
      return;
    }

    return unlinkSync(file);
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

  uploadAndMeasureImages(files: Express.Multer.File[], folder) {
    return Promise.all(
      files.map(async (photo) => {
        const [width, height] = await this.getImageRatio(photo);
        const src = await this.uploadImage(photo, folder, { width: 1280 });

        return { src, width, height };
      }),
    );
  }
}
