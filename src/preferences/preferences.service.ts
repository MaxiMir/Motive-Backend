import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Preferences } from './preferences.entity';

@Injectable()
export class PreferencesService {
  constructor(
    @InjectRepository(Preferences)
    private preferencesRepository: Repository<Preferences>,
  ) {}
}
