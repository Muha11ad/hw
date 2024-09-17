import { IAuthorEntity } from './authors.entity.interface';

export class AuthorEntity implements IAuthorEntity {
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
