import rootStore from '../instance';

export const useCartStoreInit = (): void => {
  rootStore.cart.getCart();
};
