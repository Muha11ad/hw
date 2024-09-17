import "reflect-metadata"
import { injectable } from 'inversify';
import { PrismaClient } from '@prisma/client';
import { IBookRepository } from './books.repository.interface';

@injectable()
export class BookRepository implements IBookRepository {
  constructor(private prisma: PrismaClient) {}

  async find(): Promise<any[]> {
    return await this.prisma.book.findMany({
      include: {
        authors: {
          include: {
            author: true,
          },
        },
        categories: {
          include: {
            category: true,
          },
        },
      },
    });
  }

  async findById(id: number): Promise<any | null> {
    return await this.prisma.book.findUnique({
      where: { id },
      include: {
        authors: {
          include: {
            author: true,
          },
        },
        categories: {
          include: {
            category: true,
          },
        },
      },
    });
  }

  async create(params: any): Promise<any> {
    return await this.prisma.book.create({
      data: {
        title: params.title,
        description: params.description,
        authors: {
          connect: params.authors.map((author :any) => ({ authorId: author.id })),
        },
        categories: {
          connect: params.categories.map((category :any) => ({ categoryId: category.id })),
        },
      },
      include: {
        authors: {
          include: {
            author: true,
          },
        },
        categories: {
          include: {
            category: true,
          },
        },
      },
    });
  }

  async update(id: number, params: any): Promise<any | null> {
    return await this.prisma.book.update({
      where: { id },
      data: {
        title: params.title,
        description: params.description,
        authors: {
          set: params.authors.map((author :any) => ({ authorId: author.id })),
        },
        categories: {
          set: params.categories.map((category :any) => ({ categoryId: category.id })),
        },
      },
      include: {
        authors: {
          include: {
            author: true,
          },
        },
        categories: {
          include: {
            category: true,
          },
        },
      },
    });
  }

  async remove(id: number): Promise<any | null> {
    return await this.prisma.book.delete({
      where: { id },
      include: {
        authors: {
          include: {
            author: true,
          },
        },
        categories: {
          include: {
            category: true,
          },
        },
      },
    });
  }
}
