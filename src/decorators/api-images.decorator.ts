import { fileMimetypeFilter } from 'src/helpers/file-mimetype-filter';
import { ApiFiles } from './api-files.decorator';

export const ApiImageFiles = (fieldName = 'images', maxCount = 10) =>
  ApiFiles(fieldName, maxCount, { fileFilter: fileMimetypeFilter('image') });
