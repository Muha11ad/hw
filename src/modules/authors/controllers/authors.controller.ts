import "reflect-metadata";
import { TYPES } from "../../../types";
import { ILogger } from "../../../logger";
import { HTTPError } from "../../../errors";
import { inject, injectable } from "inversify";
import { BaseController } from "../../../common";
import { Request, Response, NextFunction } from "express";
import { IAuthorsService, AuthorCreateDto, AuthorUpdateDto,IAuthorsController } from "../index";

@injectable()
export class AuthorsController extends BaseController implements IAuthorsController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.AuthorsService) private authorsService: IAuthorsService
	) {
		super(loggerService);
		this.bindRoutes([
			{ path: "/create", method: "post", func: this.create },
			{ path: "/all", method: "get", func: this.findAll },
			{ path: "/id/:id", method: "get", func: this.findById },
			{ path: "/update/:id", method: "patch", func: this.update },
			{ path: "/remove/:id", method: "delete", func: this.remove },
		]);
	}

	async create(
		{ body }: Request<{}, {}, AuthorCreateDto>,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const data = await this.authorsService.createAuthor(body);
		if (!data) return next(new HTTPError(422, "Author already exists"));
		this.ok(res, {
			status: true,
			message: "Author created successfully",
			data,
		});
	}

	async findAll(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const data = await this.authorsService.find();
		this.ok(res, {
			status: true,
			message: "Authors retrieved successfully",
			data,
		});
	}

	async findById(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const { id } = req.params;
		const data = await this.authorsService.findById(Number(id));
		if (!data) return next(new HTTPError(404, "Author not found"));
		this.ok(res, {
			status: true,
			message: "Author retrieved successfully",
			data,
		});
	}

	async update(req: Request, res: Response, next: NextFunction): Promise<void> {
		const { id } = req.params;
		const data = await this.authorsService.update(
			Number(id),
			req.body as AuthorUpdateDto
		);
		if (!data) return next(new HTTPError(404, "Author not found"));
		this.ok(res, {
			status: true,
			message: "Author updated successfully",
			data,
		});
	}

	async remove(req: Request, res: Response, next: NextFunction): Promise<void> {
		const { id } = req.params;
		const data = await this.authorsService.remove(Number(id));
		if (!data) return next(new HTTPError(404, "Author not found"));
		this.ok(res, { status: true, message: "Author deleted successfully" });
	}
}
