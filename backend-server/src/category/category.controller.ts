import { Controller, Get, Post, Body } from '@nestjs/common';

import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Serialize } from '../interceptors/serializer';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Serialize(CategoryDto)
  @Get()
  async getCategories(): Promise<Partial<CategoryDto[]>> {
    const categories = await this.categoryService.findMany({
      include: { posts: { select: { id: true, title: true } } },
    });

    return categories;
  }

  @Serialize(CategoryDto)
  @Post('create')
  async createCategories(
    @Body() body: CreateCategoryDto,
  ): Promise<Partial<CategoryDto>> {
    let postData;

    if (body.post_id) {
      postData = {
        name: body.name,
        posts: {
          connect: { id: body.post_id },
        },
      };
    } else {
      postData = {
        name: body.name,
      };
    }

    return this.categoryService.create(postData);
  }
}
