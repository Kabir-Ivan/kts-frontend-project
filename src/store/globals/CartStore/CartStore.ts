import axios from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';
import config from 'config/config';
import CartItemModel, { CartItemApi } from 'entities/cartItem';
import ProductModel from 'entities/product';
import Collection from 'entities/shared';
import RootStore from 'store/globals';
import { ILocalStore, Meta } from 'store/types';

export interface ICartStore {
  getCart(): Promise<void>;
  updateCart(): Promise<void>;
}

export type CartStoreProduct = {
  product: ProductModel;
  amount: number;
};
export class CartStore implements ILocalStore, ICartStore {
  private _list: Collection<number, CartItemModel> = {} as Collection<number, CartItemModel>;
  private _meta: Meta;

  constructor() {
    this._list = new Collection<number, CartItemModel>([], (element) => element.id);
    this._meta = Meta.initial;
    makeAutoObservable(this);
    this.getCart();
  }

  get isLoaded(): boolean {
    return this._meta == Meta.success;
  }

  get list(): Collection<number, CartItemModel> {
    return this._list;
  }

  get meta(): Meta {
    return this._meta;
  }

  get total(): number {
    return this._list.length;
  }

  get products(): CartStoreProduct[] {
    return this._list.asList().map((item) => ({
      product: RootStore.products.list.getByKey(item.id),
      amount: item.amount,
    }));
  }

  get totalPrice(): number {
    if (RootStore.products.isLoaded) {
      return this.products.reduce(
        (partialSum, item) => partialSum + item.amount * Number(String(item.product.price).replace('.', '')),
        0,
      );
    }
    return 0;
  }

  getAmount(id: number): number {
    return this._list.getByKey(id) ? this._list.getByKey(id).amount : 0;
  }

  add = (id: number, amount: number = 1) => {
    if (this._list.getByKey(id)) {
      this._list.getByKey(id).add(amount);
    } else {
      this._list.add([
        CartItemModel.fromJson({
          id: id,
          amount: amount,
        }),
      ]);
    }
    this.updateCart();
  };

  remove = (id: number, amount: number = 1) => {
    if (this._list.getByKey(id)) {
      this._list.getByKey(id).remove(amount);
      if (this._list.getByKey(id).amount <= 0) {
        this._list.remove(id);
      }
    }
    this.updateCart();
  };

  async getCart(): Promise<void> {
    if (this._meta === Meta.loading) {
      return;
    }

    this._meta = Meta.loading;
    try {
      const response = await axios({
        method: 'get',
        url: config.API.CART_URL,
      });
      runInAction(() => {
        const normalized = response.data.items.map((item: CartItemApi) => CartItemModel.fromJson(item));
        this._meta = Meta.success;
        this._list.clear();
        this._list.add(normalized);
      });
    } catch {
      this._meta = Meta.error;
    }
  }

  async updateCart(): Promise<void> {
    if (this._meta === Meta.loading) {
      return;
    }

    try {
      await axios({
        method: 'post',
        url: config.API.CART_URL,
        data: {
          cart: this._list.asList(),
        },
      });
    } catch {
      this._meta = Meta.error;
    }
  }

  destroy(): void {}
}
