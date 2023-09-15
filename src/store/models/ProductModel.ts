export type ProductApi = {
  id: number;
  title: string;
  subtitle: string;
  price: number;
  description: string;
  images: string[];
  category: string;
};

export type ProductModel = {
  id: number;
  title: string;
  subtitle: string;
  price: number;
  description: string;
  images: string[];
  category: string;
};

export const normalizeProduct = (from: ProductApi): ProductModel => ({
  id: from.id,
  title: from.title,
  subtitle: from.subtitle,
  price: from.price,
  description: from.description,
  images: from.images,
  category: from.category,
});
