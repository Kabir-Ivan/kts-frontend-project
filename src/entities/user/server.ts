import { OrderApi } from '../order';

export type UserApi = {
  id: string;
  name: string;
  email: string;
  orders: OrderApi[];
  bonuses: number;
};
