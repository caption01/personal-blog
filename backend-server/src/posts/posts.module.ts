import { Module } from '@nestjs/common';

import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PrismaService } from '../prisma.service';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService, UsersService, PrismaService],
})
export class PostsModule {}
