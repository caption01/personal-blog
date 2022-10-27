import { Expose, Type } from 'class-transformer';

// class PostCategories {
//   @Expose()
//   name: string;
// }

export class PostDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  content: any;

  @Expose()
  categories: string[];
}
