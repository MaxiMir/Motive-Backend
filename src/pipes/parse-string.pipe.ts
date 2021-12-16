import { Injectable, PipeTransform, BadRequestException, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ParseStringPipe implements PipeTransform {
  transform(value: string | undefined, metadata: ArgumentMetadata): Record<string, unknown> | undefined {
    try {
      return value && JSON.parse(value);
    } catch {
      throw new BadRequestException(`Validation failed (incorrect query ${metadata.data})`);
    }
  }
}
