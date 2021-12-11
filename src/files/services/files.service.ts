import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {
  async create(file: Express.Multer.File): Promise<string> {
    try {
      // TODO
      return '/images/temp2.png';
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
