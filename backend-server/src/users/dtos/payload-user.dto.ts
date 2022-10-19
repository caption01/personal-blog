import { Expose } from 'class-transformer';

export class PayloadUserDto {
  @Expose()
  user_id: number;

  @Expose()
  email: string;

  @Expose()
  username: string;

  @Expose()
  is_admin: boolean;
}
