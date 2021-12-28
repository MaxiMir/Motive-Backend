import { Injectable, PipeTransform, BadRequestException, ArgumentMetadata } from '@nestjs/common';
import { Characteristic, CHARACTERISTICS } from 'src/abstracts/characteristic';

@Injectable()
export class ParseCharacteristicPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata): Characteristic {
    if (!(CHARACTERISTICS as ReadonlyArray<string>).includes(value)) {
      throw new BadRequestException(`Validation failed (incorrect param ${metadata.data})`);
    }

    return value as Characteristic;
  }
}
