import { fileMimetypeFilter } from 'src/helpers/file-mimetype-filter';
import { ApiFile } from './api-file.decorator';

export const ApiImageFile = (fileName = 'image') =>
  ApiFile(fileName, { fileFilter: fileMimetypeFilter('image') });
