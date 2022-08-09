import { fileMimetypeFilter } from 'src/filters/file-mimetype-filter';
import { ApiFiles } from './api-files.decorator';

export const ApiImageFiles = (fieldName = 'images', maxCount = 6) =>
  ApiFiles(fieldName, maxCount, { fileFilter: fileMimetypeFilter('image') });
