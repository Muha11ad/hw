import { IsString, IsInt } from 'class-validator';

export class AuthorUpdateDto {
  @IsInt()
  id: number;

  @IsString()
  name: string;
}
