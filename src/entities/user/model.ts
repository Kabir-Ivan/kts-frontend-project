import OrderModel, { OrderApi } from '../order';
import { IUser } from './client';
import { UserApi } from './server';

class UserModel implements IUser {
  id: string;
  name: string;
  email: string;
  orders: OrderModel[];
  bonuses: number;

  constructor(data: UserApi) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.orders = data.orders.map((order: OrderApi) => OrderModel.fromJson(order));
    this.bonuses = data.bonuses;
  }

  static fromJson(from: UserApi) {
    return new UserModel(from);
  }
}

export default UserModel;
