import { observer } from 'mobx-react-lite';
import React from 'react';
import Counter from 'components/Counter';
import Text from 'components/Text';
import ProductModel from 'entities/product';
import RootStore from 'store/globals';
import styles from './CartItem.module.scss';

export type CartItemProps = {
  product: ProductModel;
};

const CartItem: React.FC<CartItemProps> = ({ product }) => {
  const addCallback = React.useCallback(() => {
    if (product) {
      RootStore.cart.add(product.id);
    }
  }, [product, RootStore.products.isLoaded]);
  const removeCallback = React.useCallback(() => {
    if (product) {
      RootStore.cart.remove(product.id);
    }
  }, [product, RootStore.products.isLoaded]);

  return (
    <div className={styles['cart-item']}>
      <img className={styles['cart-item__image']} src={product.images[0]} />
      <div className={styles['cart-item__name']}>
        <Text view="p-20" weight="bold">
          {product.title}
        </Text>
      </div>
      <div className={styles['cart-item__price']}>
        <Text view="p-20" weight="bold">
          ${product.price}
        </Text>
      </div>
      <div className={styles['cart-item__amount']}>
        <Counter value={RootStore.cart.getAmount(product.id)} onPlus={addCallback} onMinus={removeCallback} />
      </div>
    </div>
  );
};

export default observer(CartItem);
