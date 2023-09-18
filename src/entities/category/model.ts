import { ICategory } from './client';
import { CategoryApi } from './server';

class CategoryModel implements ICategory {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  static fromJson(from: CategoryApi): CategoryModel {
    return new CategoryModel(from.id, from.name);
  }
}

export default CategoryModel;
