import "reflect-metadata"
import { TYPES } from "../../../types";
import { inject, injectable } from "inversify";
import { IAuthorService } from "./authors.service.interface";
import {
	AuthorUpdateDto,
	AuthorEntity,
	IAuthorEntity,
	AuthorCreateDto,
	IAuthorRepository,
} from "../index";

@injectable()
export class AuthorsService implements IAuthorService {
	constructor(
		@inject(TYPES.AuthorsRepository) private authorRepository: IAuthorRepository
	) {}

	async createAuthor(params: AuthorCreateDto): Promise<IAuthorEntity | null> {
		const newAuthor = new AuthorEntity(params.id, params.name);
		return await this.authorRepository.create(newAuthor);
	}

	async find(): Promise<IAuthorEntity[]> {
		return await this.authorRepository.find();
	}

	async findById(id: number): Promise<IAuthorEntity | null> {
		return await this.authorRepository.findById(id);
	}

	async update(
		id: number,
		params: AuthorUpdateDto
	): Promise<IAuthorEntity | null> {
		const existingAuthor = await this.authorRepository.findById(id);
		if (!existingAuthor) {
			return null;
		}

		return await this.authorRepository.update(id, params);
	}

	async remove(id: number): Promise<IAuthorEntity | null> {
		const existingAuthor = await this.authorRepository.findById(id);
		if (!existingAuthor) {
			return null;
		}

		return await this.authorRepository.remove(id);
	}
}
