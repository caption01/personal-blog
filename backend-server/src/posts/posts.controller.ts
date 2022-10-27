import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Body,
  Param,
} from '@nestjs/common';
import { Post as PostModel, Prisma } from '@prisma/client';

import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { PostDto } from './dto/post.dto';
import { PostListDto } from './dto/post-list.dto';
import { Serialize } from '../interceptors/serializer';
import { JwtAuthGuard } from '../utils/passport/jwt-auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Serialize(PostListDto)
  @Get()
  async getPosts(): Promise<PostListDto[]> {
    const posts = await this.postsService.findMany({});

    const postWithCategiries = posts.map((p) => {
      const categoriesNames = p.categories.map((c) => c.name);
      return {
        id: p.id,
        title: p.title,
        categories: categoriesNames,
      };
    });

    return postWithCategiries;
  }

  @Serialize(PostDto)
  @Get(':id')
  async getPost(@Param('id') id): Promise<PostDto> {
    const post = await this.postsService.findOne({ id: parseInt(id) });

    const categoriesNames = post.categories.map((c) => c.name);

    return {
      id: post.id,
      title: post.title,
      content: post.content,
      categories: categoriesNames,
    };
  }

  @Serialize(PostDto)
  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createPost(
    @Body() body: CreatePostDto,
    @Request() request,
  ): Promise<PostModel> {
    const user = request.user;
    const categoriesNames = body.category_name || [];

    let postData = {
      title: body.title,
      content: body.content,
      author: {
        connect: { id: user.id },
      },
    } as Prisma.PostCreateInput;

    if (categoriesNames.length > 0) {
      postData = {
        ...postData,
        categories: {
          connectOrCreate: categoriesNames.map((categoryName) => {
            return {
              where: { name: categoryName },
              create: { name: categoryName },
            };
          }),
        },
      };
    }

    return this.postsService.create(postData);
  }
}
