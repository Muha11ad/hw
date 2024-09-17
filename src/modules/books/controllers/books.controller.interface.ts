import { Request, Response, NextFunction } from "express";
import { IBookEntity, BookCreateDto } from "../index";

export interface IBooksController {
	create(
		req: Request<{}, {}, BookCreateDto>,
		res: Response,
		next: NextFunction
	): Promise<void>;
	findAll(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<IBookEntity[] | void>;
	findById(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<IBookEntity | void>;
	update(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<IBookEntity | void>;
	remove(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<IBookEntity | void>;
}
