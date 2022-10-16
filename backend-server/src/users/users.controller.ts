import {
  Controller,
  Post,
  Body,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { User as UserModel } from '@prisma/client';

import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserDto } from './dtos/user.dto';
import { Serialize } from '../interceptors/serializer';
import { isPasswordEqual } from '../utils/auth/auth';

@Serialize(UserDto)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signin')
  async signin(@Body() body: Partial<CreateUserDto>): Promise<UserModel> {
    const user = await this.usersService.findOne({ email: body.email });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!isPasswordEqual(body.password, user.password)) {
      throw new BadRequestException('incorrect password');
    }

    return user;
  }

  @Post('/signup')
  async signup(@Body() body: CreateUserDto): Promise<UserModel> {
    let user = await this.usersService.findOne({ email: body.email });

    if (user) {
      throw new BadRequestException('Email alread used');
    }

    user = await this.usersService.create(body);

    return user;
  }
}
