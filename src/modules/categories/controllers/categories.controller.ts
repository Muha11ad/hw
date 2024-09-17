import { ICategoriesController } from './categories.controller.interface';
import 'reflect-metadata';
import { TYPES } from '../../../types';
import { ILogger } from '../../../logger';
import { HTTPError } from '../../../errors';
import { inject, injectable } from 'inversify';
import { BaseController } from '../../../common';
import { Request, Response, NextFunction } from 'express';
import { ICategoryService,CategoryUpdateDto ,CategoryCreateDto} from '../index';

@injectable()
export class CategoriesController extends BaseController implements ICategoriesController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.CategoriesService) private categoriesService: ICategoryService,
	) {
		super(loggerService);
		this.bindRoutes([
			{ path: '/create', method: 'post', func: this.create },
			{ path: '/all', method: 'get', func: this.findAll },
			{ path: '/id/:id', method: 'get', func: this.findById },
			{ path: '/update/:id', method: 'patch', func: this.update },
			{ path: '/remove/:id', method: 'delete', func: this.remove },
		]);
	}

	async create({ body }: Request<{}, {}, CategoryCreateDto>, res: Response, next: NextFunction): Promise<void> {
		const data = await this.categoriesService.createCategory(body);
		if (!data) return next(new HTTPError(422, 'Category already exists'));
		this.ok(res, { status: true, message: 'Category created successfully', data });
	}

	async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
		const data = await this.categoriesService.find();
		this.ok(res, { status: true, message: 'Categories retrieved successfully', data });
	}

	async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
		const { id } = req.params;
		const data = await this.categoriesService.findById(Number(id));
		if (!data) return next(new HTTPError(404, 'Category not found'));
		this.ok(res, { status: true, message: 'Category retrieved successfully', data });
	}

	async update(req: Request, res: Response, next: NextFunction): Promise<void> {
		const { id } = req.params;
		const data = await this.categoriesService.update(Number(id), req.body as CategoryUpdateDto);
		if (!data) return next(new HTTPError(404, 'Category not found'));
		this.ok(res, { status: true, message: 'Category updated successfully', data });
	}

	async remove(req: Request, res: Response, next: NextFunction): Promise<void> {
		const { id } = req.params;
		const data = await this.categoriesService.remove(Number(id));
		if (!data) return next(new HTTPError(404, 'Category not found'));
		this.ok(res, { status: true, message: 'Category deleted successfully' });
	}
}
