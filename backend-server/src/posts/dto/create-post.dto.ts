import { IsString, IsObject, IsArray } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsObject()
  content: object;

  @IsArray()
  category_name: string[];
}
