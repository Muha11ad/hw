import "reflect-metadata"
import { TYPES } from '../../../types';
import { inject, injectable } from 'inversify';
import { PrismaClient } from '@prisma/client';
import { IAuthorRepository, IAuthorEntity } from '../index';

@injectable()
export class AuthorRepository implements IAuthorRepository {
  constructor(@inject(TYPES.PrismaClient) private prisma: PrismaClient) {}

  async create(params: IAuthorEntity): Promise<IAuthorEntity> {
    return await this.prisma.author.create({
      data: {
        name: params.name,
      },
    });
  }

  async find(): Promise<IAuthorEntity[]> {
    return await this.prisma.author.findMany();
  }

  async findById(id: number): Promise<IAuthorEntity | null> {
    return await this.prisma.author.findUnique({
      where: { id },
    });
  }

  async update(id: number, params: IAuthorEntity): Promise<IAuthorEntity | null> {
    return await this.prisma.author.update({
      where: { id },
      data: {
        name: params.name,
      },
    });
  }

  async remove(id: number): Promise<IAuthorEntity | null> {
    return await this.prisma.author.delete({
      where: { id },
    });
  }
}
