// src/dto/books-update.dto.ts
import { IsString, IsArray, IsInt } from 'class-validator';

export class BookUpdateDto {
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
