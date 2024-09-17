import "reflect-metadata"
import { TYPES } from "../../../types";
import { inject, injectable } from "inversify";
import { PrismaClient } from "@prisma/client";
import { ICategoryEntity, ICategoryRepository } from "../index";

@injectable()
export class CategoryRepository implements ICategoryRepository {
	constructor(@inject(TYPES.PrismaClient) private prisma: PrismaClient) {}

	async create(params: ICategoryEntity): Promise<ICategoryEntity> {
		return await this.prisma.category.create({
			data: {
				name: params.name,
			},
		});
	}

	async find(): Promise<Array<ICategoryEntity>> {
		return await this.prisma.category.findMany();
	}

	async findById(id: number): Promise<ICategoryEntity | null> {
		return await this.prisma.category.findUnique({
			where: { id },
		});
	}

	async update(
		id: number,
		params: ICategoryEntity
	): Promise<ICategoryEntity | null> {
		return await this.prisma.category.update({
			where: { id },
			data: {
				name: params.name,
			},
		});
	}

	async remove(id: number): Promise<ICategoryEntity | null> {
		return await this.prisma.category.delete({
			where: { id },
		});
	}
}
