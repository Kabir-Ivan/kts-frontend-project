import React from 'react';
import SingleProductStore from 'store/SingleProductStore';
import { ProductModel } from 'store/models/ProductModel';
import { useLocalStore } from 'utils/useLocalStore';

export type fetchSingleProductProps = {
  id: number;
};

export type UseSingleProductStoreResult = {
  product: ProductModel | null;
  total: number;
  fetchSingleProduct: ({ id }: fetchSingleProductProps) => void;
};

const useSingleProductStore = () => {
  const [product, setSingleProduct] = React.useState<ProductModel | null>(null);
  const loader = useLocalStore(
    () =>
      new SingleProductStore((item: ProductModel) => {
        setSingleProduct(item);
      }),
  );

  const fetchSingleProduct = ({ id }: fetchSingleProductProps) => {
    loader.getProduct({
      id: id,
    });
  };
  return { product, fetchSingleProduct };
};

export default useSingleProductStore;
