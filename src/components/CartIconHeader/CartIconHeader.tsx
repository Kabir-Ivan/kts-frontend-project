import { observer } from 'mobx-react-lite';
import React from 'react';
import CartIcon from 'components/icons/CartIcon';
import RootStore from 'store/globals';
import styles from './CartIconHeader.module.scss';

const CartIconHeader: React.FC = () => {
  return (
    <div className={styles['cart-icon-header']}>
      <CartIcon />
      {<span className={styles['cart-icon-header__items-count']}>{RootStore.cart.products.length}</span>}
    </div>
  );
};

export default observer(CartIconHeader);
