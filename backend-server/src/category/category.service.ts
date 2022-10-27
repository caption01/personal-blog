import { Injectable } from '@nestjs/common';
import { Category, Prisma } from '@prisma/client';

import { PrismaService } from '../prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async findMany(
    param: Prisma.CategoryFindManyArgs,
  ): Promise<
    Prisma.CategoryGetPayload<{ include: { posts: true } }>[] | Category[]
  > {
    return this.prisma.category.findMany(param);
  }

  async create(data: Prisma.CategoryCreateInput): Promise<Category> {
    return this.prisma.category.create({ data });
  }
}
