import axios from 'axios';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import config from 'config/config';
import ProductModel, { ProductApi } from 'entities/product';
import Collection from 'entities/shared';
import { ILocalStore, Meta } from 'store/types';

export type GetProductsListParams = {
  batchSize?: number;
  substring?: string;
  categories?: number[];
  clear?: boolean;
};

export interface IProductsStore {
  getProductsList(params: GetProductsListParams): Promise<void>;
}

type PrivateFields = '_list' | '_meta' | '_total';
export class ProductsStore implements IProductsStore, ILocalStore {
  private _list: Collection<number, ProductModel> = new Collection<number, ProductModel>([], (element) => element.id);
  private _meta: Meta = Meta.initial;
  private _total: number = 0;
  private id = Math.random();

  constructor() {
    makeObservable<ProductsStore, PrivateFields>(this, {
      _list: observable,
      _meta: observable,
      _total: observable,
      list: computed,
      meta: computed,
      total: computed,
      isLoaded: computed,
      clear: action,
      getProductsList: action,
    });
  }

  get list(): Collection<number, ProductModel> {
    return this._list;
  }

  get meta(): Meta {
    return this._meta;
  }

  get isLoaded(): boolean {
    return this._meta == Meta.success;
  }

  get total(): number {
    return this._total;
  }

  hasMore = (): boolean => {
    return this._meta == Meta.success ? this._list.length < this._total : true;
  };

  clear = (): void => {
    this._list.clear();
    this._total = 0;
  };

  getProductsList = async (params: GetProductsListParams): Promise<void> => {
    if (this._meta === Meta.loading) {
      return;
    }
    this._meta = Meta.loading;

    if (params.clear) {
      this.clear();
    }

    try {
      const response = await axios({
        method: 'get',
        url: config.API.PRODUCTS_URL,
        params: {
          offset: this._list.length,
          limit: params.batchSize || 1e9,
          include: params.categories?.join('|') || '',
          substring: params.substring || '',
        },
      });

      runInAction(() => {
        const normalizedProducts = response.data.products.map((product: ProductApi) => ProductModel.fromJson(product));
        if (params.clear) {
          this.clear();
        }
        this._list.add(normalizedProducts);
        this._total = response.data.total;
        this._meta = Meta.success;
      });
    } catch {
      this._meta = Meta.error;
    }
  };

  destroy(): void {}
}
