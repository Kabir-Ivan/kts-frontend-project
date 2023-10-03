import { ICategory } from './client';
import { CategoryApi } from './server';

class CategoryModel implements ICategory {
  id: number;
  name: string;
  image: string;

  constructor(data: CategoryApi) {
    this.id = data.id;
    this.name = data.name;
    this.image = data.image;
  }

  static fromJson(from: CategoryApi): CategoryModel {
    return new CategoryModel(from);
  }
}

export default CategoryModel;
