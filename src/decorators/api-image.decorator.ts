import { fileMimetypeFilter } from 'src/helpers/file-mimetype-filter';
import { ApiFile } from './api-file.decorator';

export const ApiImageFile = (fileName = 'image', required = false) =>
  ApiFile(fileName, required, { fileFilter: fileMimetypeFilter('image') });
