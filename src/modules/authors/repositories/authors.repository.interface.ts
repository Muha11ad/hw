import { IAuthorEntity } from "../index" 

export interface IAuthorsRepository {
	create: (params: IAuthorEntity) => Promise<IAuthorEntity>;
	find: () => Promise<IAuthorEntity[]>;
	findById: (id: number) => Promise<IAuthorEntity | null>;
	update: (id: number, params: IAuthorEntity) => Promise<IAuthorEntity | null>;
	remove: (id: number) => Promise<IAuthorEntity | null>;
  }
  