import { IProduct } from './client';
import { ProductApi } from './server';

class ProductModel implements IProduct {
  id: number;
  title: string;
  subtitle: string;
  price: number;
  description: string;
  images: string[];
  category: string;

  constructor(data: ProductApi) {
    this.id = data.id;
    this.title = data.title;
    this.subtitle = data.subtitle;
    this.price = data.price;
    this.description = data.description;
    this.images = data.images;
    this.category = data.category;
  }

  static fromJson(from: ProductApi): ProductModel {
    return new ProductModel(from);
  }
}

export default ProductModel;
