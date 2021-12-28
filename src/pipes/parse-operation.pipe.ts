import { Injectable, PipeTransform, BadRequestException, ArgumentMetadata } from '@nestjs/common';
import { Operation, OPERATIONS } from 'src/abstracts/operation';

@Injectable()
export class ParseOperationPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata): Operation {
    if (!(OPERATIONS as ReadonlyArray<string>).includes(value)) {
      throw new BadRequestException(`Validation failed (incorrect param ${metadata.data})`);
    }

    return value as Operation;
  }
}
