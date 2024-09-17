import { IBooksController } from './books.controller.interface';
import "reflect-metadata";
import { TYPES } from "../../../types";
import { ILogger } from "../../../logger";
import { HTTPError } from "../../../errors";
import { inject, injectable } from "inversify";
import { BaseController } from "../../../common";
import { Request, Response, NextFunction } from "express";
import { IBookService, BookUpdateDto, BookCreateDto } from "../index";

@injectable()
export class BooksController extends BaseController implements IBooksController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.BooksService) private booksService: IBookService
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
		{ body }: Request<{}, {}, BookCreateDto>,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const data = await this.booksService.createBook(body);
		if (!data) return next(new HTTPError(422, "Book already exists"));
		this.ok(res, { status: true, message: "Book created successfully", data });
	}

	async findAll(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const data = await this.booksService.find();
		this.ok(res, {
			status: true,
			message: "Books retrieved successfully",
			data,
		});
	}

	async findById(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const { id } = req.params;
		const data = await this.booksService.findById(Number(id));
		if (!data) return next(new HTTPError(404, "Book not found"));
		this.ok(res, {
			status: true,
			message: "Book retrieved successfully",
			data,
		});
	}

	async update(req: Request, res: Response, next: NextFunction): Promise<void> {
		const { id } = req.params;
		const data = await this.booksService.update(
			Number(id),
			req.body as BookUpdateDto
		);
		if (!data) return next(new HTTPError(404, "Book not found"));
		this.ok(res, { status: true, message: "Book updated successfully", data });
	}

	async remove(req: Request, res: Response, next: NextFunction): Promise<void> {
		const { id } = req.params;
		const data = await this.booksService.remove(Number(id));
		if (!data) return next(new HTTPError(404, "Book not found"));
		this.ok(res, { status: true, message: "Book deleted successfully" });
	}
}
