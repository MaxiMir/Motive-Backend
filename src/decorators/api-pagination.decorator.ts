import { applyDecorators } from '@nestjs/common';
import { ApiQuery, ApiQueryOptions } from '@nestjs/swagger';

export function ApiPagination(options?: ApiQueryOptions) {
  return applyDecorators(
    ...[
      ApiQuery({ name: 'take', example: 10, allowEmptyValue: true }),
      ApiQuery({ name: 'skip', example: 0, allowEmptyValue: true }),
      ...(!options ? [] : [ApiQuery(options)]),
    ],
  );
}
