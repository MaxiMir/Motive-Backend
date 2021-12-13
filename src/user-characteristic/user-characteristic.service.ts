import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCharacteristic } from './user-characteristic.entity';

@Injectable()
export class UserCharacteristicService {
  constructor(
    @InjectRepository(UserCharacteristic)
    private characteristicRepository: Repository<UserCharacteristic>,
  ) {}
}
