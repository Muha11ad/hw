// src/dto/books-create.dto.ts
import { IsString, IsArray, IsInt } from 'class-validator';

export class BookCreateDto {
  @IsInt()
  id: number;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsArray()
  authors: number[];  // Array of author IDs

  @IsArray()
  categories: number[];  // Array of category IDs
}
