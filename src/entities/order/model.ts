import { IOrder, OrderStatus, ItemType } from './client';
import { OrderApi } from './server';

class OrderModel implements IOrder {
  id: string;
  status: OrderStatus;
  estimatedDeliveryTime: Date;
  items: ItemType[];

  constructor(data: OrderApi) {
    this.id = data.id;
    this.status = data.status;
    this.estimatedDeliveryTime = new Date(Date.parse(data.estimatedDeliveryTime));
    this.items = data.items;
  }

  static fromJson(from: OrderApi) {
    return new OrderModel(from);
  }
}

export default OrderModel;
