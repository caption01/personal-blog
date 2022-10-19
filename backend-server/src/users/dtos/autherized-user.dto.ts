import { Expose } from 'class-transformer';

export class AutherizedUserDto {
  @Expose()
  access_token: string;
}
