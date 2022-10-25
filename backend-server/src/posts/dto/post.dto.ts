import { Expose } from 'class-transformer';

export class PostDto {
  @Expose()
  title: string;

  @Expose()
  content: object;
}
