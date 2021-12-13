import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Characteristic } from './characteristic.entity';

@Injectable()
export class CharacteristicService {
  constructor(
    @InjectRepository(Characteristic)
    private characteristicRepository: Repository<Characteristic>,
  ) {}
}
