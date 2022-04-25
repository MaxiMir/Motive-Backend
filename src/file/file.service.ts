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
      const src = join('/', FileService.STATIC_FOLDER, folder, `${uuid.v4()}.webp`);
      const rootPath = join(FileService.ROOT_FOLDER, src);
      const meta = await sharp(file.buffer).rotate().resize(options).webp().toFile(rootPath);

      return { src, meta };
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

  uploadAndMeasureImages(files: Express.Multer.File[], folder: string) {
    return Promise.all(
      files.map(async (photo) => {
        const { src, meta } = await this.uploadImage(photo, folder, { width: 1280 });
        const [width, height] = this.calculateAspectRatio(meta.width, meta.height);

        return { src, width, height };
      }),
    );
  }
}
