import {
	ICategoryEntity,
	CategoryUpdateDto,
	CategoryCreateDto,
} from "../index";

export interface ICategoryService {
	createCategory: (
		params: CategoryCreateDto
	) => Promise<ICategoryEntity | null>;
	find: () => Promise<Array<ICategoryEntity>>;
	findById: (id: number) => Promise<ICategoryEntity | null>;
	update: (
		id: number,
		params: CategoryUpdateDto
	) => Promise<ICategoryEntity | null>;
	remove: (id: number) => Promise<ICategoryEntity | null>;
}
