import { IsString, IsInt } from 'class-validator';

export class CategoryUpdateDto {
  @IsInt()
  id: number;

  @IsString()
  name: string;
}
