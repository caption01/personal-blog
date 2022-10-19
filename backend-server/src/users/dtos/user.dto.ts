import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  user_id: number;

  @Expose()
  username: string;

  @Expose()
  is_admin: boolean;
}
