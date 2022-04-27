import { UserBaseDto } from '../../user/dto/user-base.dto';

export class DetailsDto {
  id?: number;
  day?: number;
  name?: string;
  user: UserBaseDto;
}
