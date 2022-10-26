import { IsString, IsObject } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsObject()
  content: object;
}
