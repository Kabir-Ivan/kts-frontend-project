import { observer } from 'mobx-react-lite';
import React from 'react';
import Text from 'components/Text';
import ProductModel from 'entities/product';
import styles from './OrderItem.module.scss';

export type OrderItemProps = {
  product: ProductModel;
  amount: number;
};

const OrderItem: React.FC<OrderItemProps> = ({ product, amount }) => {
  return (
    <div className={styles['order-item']}>
      <img className={styles['order-item__image']} src={product.images[0]} />
      <div className={styles['order-item__name']}>
        <Text view="p-20" weight="bold">
          {product.title}
        </Text>
      </div>
      <div className={styles['order-item__price']}>
        <Text view="p-20" weight="bold">
          ${product.price}
        </Text>
      </div>
      <div className={styles['order-item__amount']}>
        <Text view="p-20" weight="bold">
          {amount}
        </Text>
      </div>
    </div>
  );
};

export default observer(OrderItem);
