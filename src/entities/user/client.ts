import OrderModel from '../order';

export interface IUser {
  id: string;
  name: string;
  email: string;
  orders: OrderModel[];
  bonuses: number;
}
