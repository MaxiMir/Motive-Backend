import { fileMimetypeFilter } from 'src/filters/file-mimetype-filter';
import { ApiFiles } from './api-files.decorator';

export function ApiImageFiles(fieldName = 'images', maxCount = 10) {
  return ApiFiles(fieldName, maxCount, { fileFilter: fileMimetypeFilter('image') });
}
