import { ICategoryEntity } from "../index";

export interface ICategoryRepository {
    create: (params: ICategoryEntity) => Promise<ICategoryEntity>;
    find: () => Promise<ICategoryEntity[]>;
    findById: (id: number) => Promise<ICategoryEntity | null>;
    update: (id: number, params: ICategoryEntity) => Promise<ICategoryEntity | null>;
    remove: (id: number) => Promise<ICategoryEntity | null>;
  }
  