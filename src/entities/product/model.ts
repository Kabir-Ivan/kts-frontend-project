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

  constructor(
    id: number,
    title: string,
    subtitle: string,
    price: number,
    description: string,
    images: string[],
    category: string,
  ) {
    this.id = id;
    this.title = title;
    this.subtitle = subtitle;
    this.price = price;
    this.description = description;
    this.images = images;
    this.category = category;
  }

  static fromJson(from: ProductApi): ProductModel {
    return new ProductModel(
      from.id,
      from.title,
      from.subtitle,
      from.price,
      from.description,
      from.images,
      from.category,
    );
  }
}

export default ProductModel;
