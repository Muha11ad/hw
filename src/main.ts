import "reflect-metadata";
import { App } from "./app";
import { TYPES } from "./types";
import { PrismaClient } from "@prisma/client";
import { LoggerService, ILogger } from "./logger";
import { ConfigService, IConfigService } from "./config";
import { ExeptionFilter, IExeptionFilter } from "./errors";
import { Container, ContainerModule, interfaces } from "inversify";
import {
	BooksService,
	IBookService,
	BookRepository,
	BooksController,
	IBookRepository,
	IBooksController,
} from "./modules/books";
import {
	IAuthorService,
	AuthorsService,
	AuthorRepository,
	IAuthorRepository,
	IAuthorsController,
	AuthorsController,
} from "./modules/authors";
import {
	CategoryRepository,
	ICategoryRepository,
	CategoriesService,
	ICategoryService,
	ICategoriesController,
	CategoriesController,
} from "./modules/categories";

export interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
	bind<IConfigService>(TYPES.ConfigService)
		.to(ConfigService)
		.inSingletonScope();
	bind<PrismaClient>(TYPES.PrismaClient).toConstantValue(new PrismaClient());

	bind<IBookRepository>(TYPES.BooksRepository).to(BookRepository);
	bind<IBookService>(TYPES.BooksService).to(BooksService);
	bind<IBooksController>(TYPES.BooksController).to(BooksController);

	bind<IAuthorRepository>(TYPES.AuthorsRepository).to(AuthorRepository);
	bind<IAuthorService>(TYPES.AuthorsService).to(AuthorsService);
	bind<IAuthorsController>(TYPES.AuthorsController).to(AuthorsController);

	bind<ICategoryRepository>(TYPES.CategoriesRepository).to(CategoryRepository);
	bind<ICategoryService>(TYPES.CategoriesService).to(CategoriesService);
	bind<ICategoriesController>(TYPES.CategoriesController).to(
		CategoriesController
	);

	bind<App>(TYPES.Application).to(App);
});

function bootstrap(): IBootstrapReturn {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();
	return { appContainer, app };
}

export const { app, appContainer } = bootstrap();
