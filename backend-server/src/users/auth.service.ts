import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

import { UsersService } from './users.service';
import { PayloadUserDto } from './dtos/payload-user.dto';
import { AutherizedUserDto } from './dtos/autherized-user.dto';

import { isPasswordEqual } from '../utils/auth/auth';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.usersService.findOne({ username });

    if (!user || !(await isPasswordEqual(password, user.password))) {
      return null;
    }

    return user;
  }

  async login(user: User): Promise<AutherizedUserDto> {
    const payload = {
      username: user.username,
      email: user.email,
      user_id: user.id,
      is_admin: user.is_admin,
    } as PayloadUserDto;

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
