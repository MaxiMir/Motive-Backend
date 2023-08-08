import { Injectable, PipeTransform, BadRequestException, ArgumentMetadata } from '@nestjs/common';
import { LOCALES, LocaleDto } from 'src/common/locale.dto';

@Injectable()
export class ParseCharacteristicPipe implements PipeTransform {
  validate(value: string): value is LocaleDto {
    return (LOCALES as ReadonlyArray<string>).includes(value);
  }

  transform(value: string, metadata: ArgumentMetadata) {
    if (!this.validate(value)) {
      throw new BadRequestException(`Validation failed (incorrect param ${metadata.data})`);
    }

    return value;
  }
}
