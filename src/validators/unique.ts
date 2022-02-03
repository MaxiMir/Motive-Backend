import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ValidatorConstraint } from 'class-validator';
import { UniqueValidator } from './abstract-unique-validator';

@ValidatorConstraint({ name: 'unique', async: false })
@Injectable()
export class Unique extends UniqueValidator {
  constructor(@InjectConnection() protected readonly connection: Connection) {
    super(connection);
  }
}
