import axios from 'axios';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import config from 'config/config';
import ProductModel from 'entities/product';
import { ILocalStore, Meta } from 'store/types';

export type GetProductParams = {
  id: number;
};

export interface ISingleProductStore {
  getProduct(params: GetProductParams): Promise<void>;
}

type PrivateFields = '_product' | '_meta';
export class SingleProductStore implements ISingleProductStore, ILocalStore {
  private _product: ProductModel | null = null;
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<SingleProductStore, PrivateFields>(this, {
      _product: observable,
      _meta: observable,
      product: computed,
      meta: computed,
      isLoaded: computed,
      clear: action,
      getProduct: action,
    });
  }

  get product(): ProductModel | null {
    return this._product;
  }

  get meta(): Meta {
    return this._meta;
  }

  get isLoaded(): boolean {
    return this._meta == Meta.success;
  }

  clear = () => {
    this._meta = Meta.initial;
    this._product = null;
  };

  getProduct = async (params: GetProductParams): Promise<void> => {
    if (this._meta === Meta.loading) {
      return;
    }

    this._meta = Meta.loading;

    const response = await axios({
      method: 'get',
      url: `${config.API.PRODUCT_URL}${params.id}`,
    });

    if (response.data) {
      runInAction(() => {
        this._meta = Meta.success;
        this._product = ProductModel.fromJson(response.data);
      });
    } else {
      this._meta = Meta.error;
    }
  };

  destroy(): void {}
}
