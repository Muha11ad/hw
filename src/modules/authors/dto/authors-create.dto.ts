import { IsString, IsInt } from 'class-validator';

export class AuthorCreateDto {
  @IsInt()
  id: number;

  @IsString()
  name: string;
}
