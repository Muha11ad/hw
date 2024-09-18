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
	IBooksService,
	BooksRepository,
	BooksController,
	IBooksRepository,
	IBooksController,
} from "./modules/books";
import {
	IAuthorsService,
	AuthorsService,
	AuthorsRepository,
	IAuthorsRepository,
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

	bind<IBooksRepository>(TYPES.BooksRepository).to(BooksRepository);
	bind<IBooksService>(TYPES.BooksService).to(BooksService);
	bind<IBooksController>(TYPES.BooksController).to(BooksController);

	bind<IAuthorsRepository>(TYPES.AuthorsRepository).to(AuthorsRepository);
	bind<IAuthorsService>(TYPES.AuthorsService).to(AuthorsService);
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
