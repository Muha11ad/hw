import "reflect-metadata"
import { inject, injectable } from "inversify";
import { TYPES } from "../../../types";
import { ICategoryService } from "./categories.service.interface";
import {
	CategoryUpdateDto,
	CategoryEntity,
	ICategoryEntity,
	CategoryCreateDto,
	ICategoryRepository,
} from "../index";

@injectable()
export class CategoriesService implements ICategoryService {
	constructor(
		@inject(TYPES.CategoriesRepository)
		private categoryRepository: ICategoryRepository
	) {}

	async createCategory(
		params: CategoryCreateDto
	): Promise<ICategoryEntity | null> {
		const newCategory = new CategoryEntity(params.id, params.name);
		return await this.categoryRepository.create(newCategory);
	}

	async find(): Promise<ICategoryEntity[]> {
		return await this.categoryRepository.find();
	}

	async findById(id: number): Promise<ICategoryEntity | null> {
		return await this.categoryRepository.findById(id);
	}

	async update(
		id: number,
		params: CategoryUpdateDto
	): Promise<ICategoryEntity | null> {
		const existingCategory = await this.categoryRepository.findById(id);
		if (!existingCategory) {
			return null;
		}

		return await this.categoryRepository.update(id, params);
	}

	async remove(id: number): Promise<ICategoryEntity | null> {
		const existingCategory = await this.categoryRepository.findById(id);
		if (!existingCategory) {
			return null;
		}

		return await this.categoryRepository.remove(id);
	}
}
