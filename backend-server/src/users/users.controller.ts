import { Controller, Post, Body, Get } from '@nestjs/common';
import { User as UserModel } from '@prisma/client';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signin')
  async signinUser(
    @Body() body: { email: string; password: string },
  ): Promise<UserModel> {
    return this.usersService.user({ email: body.email });
  }

  @Post('/signup')
  async signupUser(
    @Body() body: { name: string; email: string; password: string },
  ): Promise<UserModel> {
    return this.usersService.createUser(body);
  }
}
