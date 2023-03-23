import { Injectable, PipeTransform, BadRequestException, ArgumentMetadata } from '@nestjs/common';
import { CharacteristicDto, CHARACTERISTICS } from 'src/common/characteristic.dto';

@Injectable()
export class ParseCharacteristicPipe implements PipeTransform {
  validate(value: string): value is CharacteristicDto {
    return (CHARACTERISTICS as ReadonlyArray<string>).includes(value);
  }

  transform(value: string, metadata: ArgumentMetadata): CharacteristicDto {
    if (!this.validate(value)) {
      throw new BadRequestException(`Validation failed (incorrect param ${metadata.data})`);
    }

    return value as CharacteristicDto;
  }
}
