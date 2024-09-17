import { IsString, IsInt } from 'class-validator';

export class CategoryCreateDto {
  @IsInt()
  id: number;

  @IsString()
  name: string;
}
