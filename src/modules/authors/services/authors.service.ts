import "reflect-metadata"
import { TYPES } from "../../../types";
import { inject, injectable } from "inversify";
import { IAuthorsService } from "./authors.service.interface";
import {
	AuthorUpdateDto,
	AuthorEntity,
	IAuthorEntity,
	AuthorCreateDto,
	IAuthorsRepository,
} from "../index";

@injectable()
export class AuthorsService implements IAuthorsService {
	constructor(
		@inject(TYPES.AuthorsRepository) private authorsRepository: IAuthorsRepository
	) {}

	async createAuthor(params: AuthorCreateDto): Promise<IAuthorEntity | null> {
		const newAuthor = new AuthorEntity(params.id, params.name);
		return await this.authorsRepository.create(newAuthor);
	}

	async find(): Promise<IAuthorEntity[]> {
		return await this.authorsRepository.find();
	}

	async findById(id: number): Promise<IAuthorEntity | null> {
		return await this.authorsRepository.findById(id);
	}

	async update(
		id: number,
		params: AuthorUpdateDto
	): Promise<IAuthorEntity | null> {
		const existingAuthor = await this.authorsRepository.findById(id);
		if (!existingAuthor) {
			return null;
		}

		return await this.authorsRepository.update(id, params);
	}

	async remove(id: number): Promise<IAuthorEntity | null> {
		const existingAuthor = await this.authorsRepository.findById(id);
		if (!existingAuthor) {
			return null;
		}

		return await this.authorsRepository.remove(id);
	}
}
