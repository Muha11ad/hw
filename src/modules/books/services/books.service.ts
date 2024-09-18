import "reflect-metadata"
import { inject, injectable } from 'inversify';
import { TYPES } from '../../../types';
import { IBooksService } from './books.service.interface';
import { IBooksRepository,BookUpdateDto,IBookEntity,BookEntity ,BookCreateDto} from '../index';

@injectable()
export class BooksService implements IBooksService {
  constructor(
    @inject(TYPES.BooksRepository) private booksRepository: IBooksRepository
  ) {}

  async createBook(params: BookCreateDto): Promise<IBookEntity | null> {
    const newBook = new BookEntity(
      params.id,
      params.title,
      params.authors,
      params.description,
      params.categories,
    );
    return await this.booksRepository.create(newBook);
  }

  async find(): Promise<IBookEntity[]> {
    return await this.booksRepository.find();
  }

  async findById(id: number): Promise<IBookEntity | null> {
    return await this.booksRepository.findById(id);
  }

  async update(id: number, params: BookUpdateDto): Promise<IBookEntity | null> {
    const existingBook = await this.booksRepository.findById(id);
    if (!existingBook) {
      return null;
    }

    return await this.booksRepository.update(id, params);
  }

  async remove(id: number): Promise<IBookEntity | null> {
    const existingBook = await this.booksRepository.findById(id);
    if (!existingBook) {
      return null;
    }

    return await this.booksRepository.remove(id);
  }
}
