import { OrderStatus, ItemType } from './client';

export type OrderApi = {
  id: string;
  status: OrderStatus;
  estimatedDeliveryTime: string;
  items: ItemType[];
};
