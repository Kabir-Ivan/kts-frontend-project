import { observer } from 'mobx-react-lite';
import React from 'react';
import Button from 'components/Button';
import Text from 'components/Text';
import RootStore from 'store/globals';
import CartItem from './components/CartItem';
import styles from './Cart.module.scss';

const Cart: React.FC = () => {
  return (
    <div className={styles['cart']}>
      <Text view="title" weight="bold">
        Cart
      </Text>
      {RootStore.products.isLoaded && (
        <div className={styles['cart__items']}>
          {RootStore.cart.products.map((item, i) => (
            <CartItem product={item.product} key={i} />
          ))}
        </div>
      )}
      <div className={styles['cart__checkout']}>
        <Text view="p-20" weight="bold" className="fullwidth">
          Total: ${RootStore.cart.totalPrice}
        </Text>
        <Button className={styles['cart__checkout_button']}>Checkout</Button>
      </div>
    </div>
  );
};

export default observer(Cart);
