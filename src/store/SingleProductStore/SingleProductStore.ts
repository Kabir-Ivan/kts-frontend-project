import axios from 'axios';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import config from 'config/config';
import { ILocalStore, Meta } from 'store/types';
import { ProductModel, normalizeProduct } from './../models/ProductModel';

export type GetProductParams = {
  id: number;
};

export interface ISingleProductStore {
  getProduct(params: GetProductParams): Promise<void>;
}

type PrivateFields = '_product' | '_meta';
export default class SingleProductStore implements ISingleProductStore, ILocalStore {
  private _product: ProductModel | null = null;
  private _meta: Meta = Meta.initial;
  private _callback: (item: ProductModel) => void;

  constructor(callback: (item: ProductModel) => void) {
    this._callback = callback;
    makeObservable<SingleProductStore, PrivateFields>(this, {
      _product: observable,
      _meta: observable,
      product: computed,
      meta: computed,
      getProduct: action,
    });
  }

  get product(): ProductModel | null {
    return this._product;
  }

  get meta(): Meta {
    return this._meta;
  }

  clear(): void {
    this._meta = Meta.initial;
    this._product = null;
  }

  async getProduct(params: GetProductParams): Promise<void> {
    runInAction(async () => {
      this._meta = Meta.loading;
      try {
        const response = await axios({
          method: 'get',
          url: `${config.PRODUCT_URL}${params.id}`,
        });
        const normalized = normalizeProduct(response.data);
        this._meta = Meta.success;
        this._product = normalized;
        this._callback(this._product);
      } catch {
        this._meta = Meta.error;
      }
    });
  }

  destroy(): void {}
}
