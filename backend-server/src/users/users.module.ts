import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma.service';
import { LocalStrategy } from '../utils/passport/local.strategy';
import { jwtConstants } from '../constants';
import { JwtStrategy } from '../utils/passport/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '4h' },
    }),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthService,
    PrismaService,
    LocalStrategy,
    JwtStrategy,
  ],
  exports: [UsersService, AuthService],
})
export class UsersModule {}
