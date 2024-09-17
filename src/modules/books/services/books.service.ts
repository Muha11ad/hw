import "reflect-metadata"
import { inject, injectable } from 'inversify';
import { TYPES } from '../../../types';
import { IBookService } from './books.service.interface';
import { IBookRepository,BookUpdateDto,IBookEntity,BookEntity ,BookCreateDto} from '../index';

@injectable()
export class BooksService implements IBookService {
  constructor(
    @inject(TYPES.BooksRepository) private bookRepository: IBookRepository
  ) {}

  async createBook(params: BookCreateDto): Promise<IBookEntity | null> {
    const newBook = new BookEntity(
      params.id,
      params.title,
      params.authors,
      params.description,
      params.categories,
    );
    return await this.bookRepository.create(newBook);
  }

  async find(): Promise<IBookEntity[]> {
    return await this.bookRepository.find();
  }

  async findById(id: number): Promise<IBookEntity | null> {
    return await this.bookRepository.findById(id);
  }

  async update(id: number, params: BookUpdateDto): Promise<IBookEntity | null> {
    const existingBook = await this.bookRepository.findById(id);
    if (!existingBook) {
      return null;
    }

    return await this.bookRepository.update(id, params);
  }

  async remove(id: number): Promise<IBookEntity | null> {
    const existingBook = await this.bookRepository.findById(id);
    if (!existingBook) {
      return null;
    }

    return await this.bookRepository.remove(id);
  }
}
