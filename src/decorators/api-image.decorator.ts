import { fileMimetypeFilter } from 'src/filters/file-mimetype-filter';
import { ApiFile } from './api-file.decorator';

export function ApiImageFile(fileName = 'image') {
  return ApiFile(fileName, { fileFilter: fileMimetypeFilter('image') });
}
