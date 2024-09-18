import { IBookEntity } from "../index"

export interface IBooksRepository {
	find: () => Promise<Array<IBookEntity>>;
	remove: (id: number) => Promise<IBookEntity | null>;
	create: (params: IBookEntity) => Promise<IBookEntity>;
	findById: (id: number) => Promise<IBookEntity | null>;
	update: (id: number, params: IBookEntity) => Promise<IBookEntity | null>;
  }