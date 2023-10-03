import { observer } from 'mobx-react-lite';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'components/Button';
import Nothing from 'components/Nothing';
import Text from 'components/Text';
import config from 'config/config';
import RootStore from 'store/globals';
import CartItem from './components/CartItem';
import styles from './Cart.module.scss';

const Cart: React.FC = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  const go = React.useCallback(() => {
    navigate(config.ENDPOINTS.CHECKOUT);
  }, [navigate]);

  return (
    <div className={styles['cart']}>
      <Text view="title" weight="bold">
        Cart
      </Text>
      {RootStore.cart.isLoaded &&
        (RootStore.cart.total ? (
          <div className={styles['cart__items']}>
            {RootStore.cart.products.map((item, i) => item.product && <CartItem product={item.product} key={i} />)}
          </div>
        ) : (
          <Nothing />
        ))}
      <div className={styles['cart__checkout']}>
        <Text view="p-20" weight="bold" className="fullwidth">
          Total: ${RootStore.cart.totalPrice}
        </Text>
        {RootStore.cart.total ? (
          <Button className={styles['cart__checkout_button']} onClick={go}>
            Checkout
          </Button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default observer(Cart);
