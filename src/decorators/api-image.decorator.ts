import { fileMimetypeFilter } from 'src/filters/file-mimetype-filter';
import { ApiFile } from './api-file.decorator';

export const ApiImageFile = (fileName = 'image') =>
  ApiFile(fileName, { fileFilter: fileMimetypeFilter('image') });
