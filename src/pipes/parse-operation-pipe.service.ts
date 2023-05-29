import { Injectable, PipeTransform, BadRequestException, ArgumentMetadata } from '@nestjs/common';
import { OPERATIONS, OperationDto } from 'src/common/operation.dto';

@Injectable()
export class ParseOperationPipe implements PipeTransform {
  validate(value: string): value is OperationDto {
    return (OPERATIONS as ReadonlyArray<string>).includes(value);
  }

  transform(value: string, metadata: ArgumentMetadata): OperationDto {
    if (!this.validate(value)) {
      throw new BadRequestException(`Validation failed (incorrect param ${metadata.data})`);
    }

    return value as OperationDto;
  }
}
