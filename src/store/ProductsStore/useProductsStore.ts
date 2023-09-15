import React from 'react';
import ProductsStore from 'store/ProductsStore';
import { ProductModel } from 'store/models/ProductModel';
import Collection from 'store/models/shared/Collection';
import { useLocalStore } from 'utils/useLocalStore';

export type fetchProductsProps = {
  substring: string;
  categories: number[];
  batchSize: number;
  clear: boolean;
};

export type UseProductsStoreResult = {
  products: Collection<number, ProductModel>;
  total: number;
  fetchProducts: ({ substring, categories, batchSize, clear }: fetchProductsProps) => void;
};

const useProductsStore = () => {
  const [products, setProducts] = React.useState<Collection<number, ProductModel>>(
    new Collection<number, ProductModel>([], (element) => element.id),
  );
  const [total, setTotal] = React.useState<number | undefined>(undefined);
  const loader = useLocalStore(
    () =>
      new ProductsStore(
        (array: Collection<number, ProductModel>) => {
          setProducts(array);
        },
        (num: number) => {
          setTotal(num);
        },
      ),
  );

  const fetchProducts = ({ substring, categories, batchSize, clear }: fetchProductsProps) => {
    loader.getProductsList({
      substring: substring,
      categories: categories,
      batchSize: batchSize,
      clear: clear,
    });
  };
  return { products, total, fetchProducts };
};

export default useProductsStore;
