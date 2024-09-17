import { Request, Response, NextFunction } from "express";
import { ICategoryEntity, CategoryCreateDto } from "../index";

export interface ICategoriesController {
	create(
		req: Request<{}, {}, CategoryCreateDto>,
		res: Response,
		next: NextFunction
	): Promise<void>;
	findAll(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Array<ICategoryEntity> | void>;
	findById(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<ICategoryEntity | void>;
	update(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<ICategoryEntity | void>;
	remove(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<ICategoryEntity | void>;
}
