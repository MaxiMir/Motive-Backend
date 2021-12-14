import {
  Injectable,
  PipeTransform,
  BadRequestException,
  ArgumentMetadata,
} from '@nestjs/common';

@Injectable()
export class ObjectToNumbersArrayPipe implements PipeTransform {
  transform(
    value: Record<string, unknown> | undefined,
    metadata: ArgumentMetadata,
  ): [number, number][] | undefined {
    if (!value) {
      return;
    }

    return Object.entries(value).map(([k, v]) => {
      const preparedKey = Number(k);
      const preparedValue = Number(v);

      if (!preparedKey || !preparedValue) {
        throw new BadRequestException(
          `Validation failed (incorrect query ${metadata.data})`,
        );
      }

      return [preparedKey, preparedValue];
    });
  }
}
