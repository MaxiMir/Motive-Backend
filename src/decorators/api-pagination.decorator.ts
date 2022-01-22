import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export const ApiPagination = () =>
  applyDecorators(
    ApiQuery({ name: 'take', example: 10, allowEmptyValue: true }),
    ApiQuery({ name: 'skip', example: 0, allowEmptyValue: true }),
  );
