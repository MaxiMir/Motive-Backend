import { Injectable, PipeTransform, BadRequestException, ArgumentMetadata } from '@nestjs/common';
import { OperationDto, OPERATIONS } from 'src/common/operation.dto';

@Injectable()
export class parseInsertOperationPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata): OperationDto {
    if (OPERATIONS[0] !== value) {
      throw new BadRequestException(`Validation failed (incorrect param ${metadata.data})`);
    }

    return value as OperationDto;
  }
}
