import { ICategoryEntity } from './categories.entity.interface';

export class CategoryEntity implements ICategoryEntity {
  constructor(
    private readonly _id: number,
    private readonly _name: string
  ) {}

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }
}
