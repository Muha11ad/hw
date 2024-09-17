import { IBookEntity } from './books.entity.interface';

export class BookEntity implements IBookEntity {
  constructor(
    private readonly _id: number,
    private readonly _title: string,
    private readonly _authors: number[],  
    private readonly _description: string,
    private readonly _categories: number[] ,
  ) {}

  get id(): number {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get description(): string {
    return this._description;
  }

  get authors(): any[] {
    return this._authors;
  }

  get categories(): any[] {
    return this._categories;
  }
}
