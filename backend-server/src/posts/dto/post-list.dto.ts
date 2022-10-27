import { Expose } from 'class-transformer';

export class PostListDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  categories: string[];
}
