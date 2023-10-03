import rootStore from '../instance';

export const useProductsStoreInit = (): void => {
  rootStore.products.getProductsList({});
};
