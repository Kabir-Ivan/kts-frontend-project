import { ProductApi, ProductModel, normalizeProduct } from './ProductModel';

export type ProductsListApi = {
  total: number;
  products: ProductApi[];
};
export type ProductsListModel = {
  total: number;
  products: ProductModel[];
};

export const normalizeProductsList = (from: ProductsListApi): ProductsListModel => ({
  total: from.total,
  products: from.products.map((product) => normalizeProduct(product)),
});
