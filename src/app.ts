import "reflect-metadata";
import { Server } from "http";
import express, { Express, json } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "./types";
import { ILogger } from "./logger";
import {  IConfigService } from "./config";
import { IExeptionFilter } from "./errors";
import { PrismaClient } from "@prisma/client";
import { BooksController } from "./modules/books";
import { AuthorsController } from "./modules/authors";
import { CategoriesController } from "./modules/categories";

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number | string;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.PrismaClient) private prismaClient: PrismaClient,
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.ExeptionFilter) private exeptionFilter: IExeptionFilter,
		@inject(TYPES.BooksController) private booksController: BooksController,
		@inject(TYPES.CategoriesController) private categoriesController: CategoriesController,
		@inject(TYPES.AuthorsController) private authorsController: AuthorsController,
	) {
		this.app = express();
		this.port = this.configService.get("PORT") || 8000;
	}

	useMiddleware(): void {
		this.app.use(json());
	}

	useRoutes(): void {
		this.app.use("/books", this.booksController.router);
		this.app.use("/authors", this.authorsController.router);
		this.app.use("/categories", this.categoriesController.router);
	}

	useExeptionFilters(): void {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
	}

	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRoutes();
		this.useExeptionFilters();
		this.server = this.app.listen(this.port);
		this.logger.log(`http://localhost:${this.port}`);
	}
}
