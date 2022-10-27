import { Expose, Type } from 'class-transformer';

class Posts {
  @Expose()
  id: number;

  @Expose()
  title: string;
}

export class CategoryDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  @Type(() => Posts)
  posts?: Posts[];
}
