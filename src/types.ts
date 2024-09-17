export const TYPES = {
	Application: Symbol.for('Application'),
	ILogger: Symbol.for('ILogger'),
	ExeptionFilter: Symbol.for('ExeptionFilter'),
	ConfigService: Symbol.for('ConfigService'),
	PrismaClient: Symbol.for('PrismaClient'),

	BooksController: Symbol.for('BooksController'),
	BooksService: Symbol.for('BooksService'),
	BooksModel: Symbol.for('BooksModel'),
	BooksRepository: Symbol.for('BooksRepository'),

	CategoriesController: Symbol.for('CategoriesController'),
	CategoriesService: Symbol.for('CategoriesService'),
	CategoriesModel: Symbol.for('CategoriesModel'),
	CategoriesRepository: Symbol.for('CategoriesRepository'),

	AuthorsController: Symbol.for('AuthorsController'),
	AuthorsService: Symbol.for('AuthorsService'),
	AuthorsModel: Symbol.for('AuthorsModel'),
	AuthorsRepository: Symbol.for('AuthorsRepository'),
};
