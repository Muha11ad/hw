import { AuthorCreateDto, AuthorUpdateDto, IAuthorEntity } from "../index";

export interface IAuthorsService {
	createAuthor: (params: AuthorCreateDto) => Promise<IAuthorEntity | null>;
	find: () => Promise<Array<IAuthorEntity>>;
	findById: (id: number) => Promise<IAuthorEntity | null>;
	update: (
		id: number,
		params: AuthorUpdateDto
	) => Promise<IAuthorEntity | null>;
	remove: (id: number) => Promise<IAuthorEntity | null>;
}
