import { join } from 'path';
import { existsSync, unlinkSync } from 'fs';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import * as sharp from 'sharp';

@Injectable()
export class FileService {
  static rootFolder = 'client';
  static staticFolder = 'static';

  async uploadImage(file: Express.Multer.File, folder: string, options: { width?: number; height?: number }) {
    try {
      const src = join('/', FileService.staticFolder, folder, `${uuid.v4()}.webp`);
      const rootPath = join(FileService.rootFolder, src);
      const meta = await sharp(file.buffer, { unlimited: true })
        .rotate()
        .resize(options)
        .webp()
        .toFile(rootPath);

      return { src, meta };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  removeImage(relativePath: string) {
    const file = join(FileService.rootFolder, relativePath);

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
