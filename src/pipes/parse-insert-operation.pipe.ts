import { Injectable, PipeTransform, BadRequestException, ArgumentMetadata } from '@nestjs/common';
import { Operation, OPERATIONS } from 'src/abstracts/operation';

@Injectable()
export class parseInsertOperationPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata): Operation {
    if (OPERATIONS[0] !== value) {
      throw new BadRequestException(`Validation failed (incorrect param ${metadata.data})`);
    }

    return value as Operation;
  }
}
