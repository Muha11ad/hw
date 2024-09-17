import { Request, Response, NextFunction } from "express";
import { IAuthorEntity, AuthorCreateDto } from "../index";

export interface IAuthorsController {
	create(
		req: Request<{}, {}, AuthorCreateDto>,
		res: Response,
		next: NextFunction
	): Promise<void>;
	findAll(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<IAuthorEntity[] | void>;
	findById(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<IAuthorEntity | void>;
	update(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<IAuthorEntity | void>;
	remove(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<IAuthorEntity | void>;
}
