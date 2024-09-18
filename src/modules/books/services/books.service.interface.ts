import { BookCreateDto, BookUpdateDto, IBookEntity } from "../index";

export interface IBooksService {
	find: () => Promise<Array<IBookEntity>>;
	remove: (id: number) => Promise<IBookEntity | null>;
	findById: (id: number) => Promise<IBookEntity | null>;
	createBook: (params: BookCreateDto) => Promise<IBookEntity | null>;
	update: (id: number, params: BookUpdateDto) => Promise<IBookEntity | null>;
}
