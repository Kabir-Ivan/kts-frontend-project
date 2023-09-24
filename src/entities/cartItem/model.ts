import { action, makeObservable, observable } from 'mobx';
import { ICartItem } from './client';
import { CartItemApi } from './server';

class CartItemModel implements ICartItem {
  id: number;
  amount: number;

  constructor(data: CartItemApi) {
    this.id = data.id;
    this.amount = data.amount;
    makeObservable<CartItemModel>(this, {
      id: observable,
      amount: observable,
      add: action,
      remove: action,
    });
  }

  add = (amount: number) => {
    this.amount += amount;
  };

  remove = (amount: number) => {
    this.amount -= amount;
    this.amount = Math.max(0, this.amount);
  };

  static fromJson(from: CartItemApi) {
    return new CartItemModel(from);
  }
}

export default CartItemModel;
