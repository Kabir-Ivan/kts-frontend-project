export enum OrderStatus {
  Pending = 'Pending',
  Processing = 'Processing',
  Shipped = 'Shipped',
  Delivered = 'Delivered',
  Completed = 'Completed',
}

export interface IOrder {
  id: string;
  status: OrderStatus;
  estimatedDeliveryTime: Date;
  items: ItemType[];
}

export type ItemType = {
  id: number;
  amount: number;
};
