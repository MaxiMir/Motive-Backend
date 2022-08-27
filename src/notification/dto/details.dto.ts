import { UserBaseEntity } from 'src/user/entities/user-base.entity';

export class DetailsDto {
  readonly id?: number;
  readonly day?: number;
  readonly name?: string;
  readonly user: UserBaseEntity;
}
