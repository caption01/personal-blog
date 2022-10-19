import {
  Controller,
  Post,
  Body,
  BadRequestException,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { User as UserModel } from '@prisma/client';

import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserDto } from './dtos/user.dto';
import { AutherizedUserDto } from './dtos/autherized-user.dto';
import { Serialize } from '../interceptors/serializer';
import { LocalAuthGuard } from '../utils/passport/local-auth.guard';
import { JwtAuthGuard } from '../utils/passport/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Serialize(AutherizedUserDto)
  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  async signin(@Request() req): Promise<AutherizedUserDto> {
    return this.authService.login(req.user);
  }

  @Serialize(UserDto)
  @Post('/signup')
  async signup(@Body() body: CreateUserDto): Promise<UserDto> {
    let user = await this.usersService.findOne({ email: body.email });

    if (user) {
      throw new BadRequestException('Email alread used');
    }

    user = await this.usersService.create(body);

    return {
      user_id: user.id,
      username: user.email,
      is_admin: user.is_admin,
    };
  }

  @Serialize(UserDto)
  @UseGuards(JwtAuthGuard)
  @Get('whoiam')
  async whoiam(@Request() req) {
    return req.user;
  }
}
