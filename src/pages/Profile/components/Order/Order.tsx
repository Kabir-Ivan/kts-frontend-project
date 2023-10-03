import React from 'react';
import Text from 'components/Text';
import { OrderStatus } from 'entities/order';
import ProductModel from 'entities/product';
import OrderItem from '../OrderItem';
import styles from './Order.module.scss';

export type OrderProps = {
  id: string;
  status: OrderStatus;
  items: {
    product: ProductModel;
    amount: number;
  }[];
};

const Order: React.FC<OrderProps> = ({ id, status, items }) => {
  return (
    <div className={styles['order']}>
      <Text view="p-20" weight="bold">
        ID: {id}
      </Text>
      <Text view="p-20" weight="bold">
        Status: {status}
      </Text>
      <Text view="p-20" weight="bold">
        Products:
      </Text>
      {items.map((item, i) => (
        <OrderItem product={item.product} amount={item.amount} key={i} />
      ))}
    </div>
  );
};

export default Order;
