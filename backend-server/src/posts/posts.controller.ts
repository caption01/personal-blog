import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common';
import { Post as PostModel } from '@prisma/client';

import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { PostDto } from './dto/post.dto';
import { Serialize } from '../interceptors/serializer';
import { JwtAuthGuard } from '../utils/passport/jwt-auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  async getPosts(): Promise<PostModel[]> {
    return await this.postsService.find({});
  }

  @Serialize(PostDto)
  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createPost(
    @Body() body: CreatePostDto,
    @Request() request,
  ): Promise<PostModel> {
    const user = request.user;

    const postData = {
      ...body,
      author: {
        connect: { id: user.id },
      },
    };

    return this.postsService.create(postData);
  }
}
