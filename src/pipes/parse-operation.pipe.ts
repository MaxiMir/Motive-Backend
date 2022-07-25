import { Injectable, PipeTransform, BadRequestException, ArgumentMetadata } from '@nestjs/common';
import { OperationDto, OPERATIONS } from 'src/common/operation.dto';

@Injectable()
export class ParseOperationPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata): OperationDto {
    if (!(OPERATIONS as ReadonlyArray<string>).includes(value)) {
      throw new BadRequestException(`Validation failed (incorrect param ${metadata.data})`);
    }

    return value as OperationDto;
  }
}
