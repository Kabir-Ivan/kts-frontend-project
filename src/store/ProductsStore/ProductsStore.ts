import axios from 'axios';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import config from 'config/config';
import { ILocalStore, Meta } from 'store/types';
import Collection from '../models/shared/Collection';
import { ProductModel } from './../models/ProductModel';
import { normalizeProductsList } from './../models/ProductsListModel';

export type GetProductsListParams = {
  batchSize: number;
  substring: string;
  categories: number[];
  clear: boolean;
};

export interface IProductsStore {
  getProductsList(params: GetProductsListParams): Promise<void>;
}

type PrivateFields = '_list' | '_meta' | '_total';
export default class ProductsStore implements IProductsStore, ILocalStore {
  private _list: Collection<number, ProductModel> = new Collection<number, ProductModel>([], (element) => element.id);
  private _meta: Meta = Meta.initial;
  private _total: number = 0;
  private _requests = 0;
  private _lastClear = 0;
  private _expected = 0;
  private _callback: ((items: Collection<number, ProductModel>) => void) | null;
  private _callbackTotal: ((total: number) => void) | null;

  constructor(
    callback: ((items: Collection<number, ProductModel>) => void) | null,
    callbackTotal: ((total: number) => void) | null,
  ) {
    this._callback = callback;
    this._callbackTotal = callbackTotal;
    makeObservable<ProductsStore, PrivateFields>(this, {
      _list: observable,
      _meta: observable,
      _total: observable,
      list: computed,
      meta: computed,
      total: computed,
      getProductsList: action,
    });
  }

  get list(): Collection<number, ProductModel> {
    return this._list;
  }

  get meta(): Meta {
    return this._meta;
  }

  get total(): number {
    return this._total;
  }

  clear(): void {
    this._meta = Meta.initial;
    this._list.clear();
    this._total = 0;
  }

  async getProductsList(params: GetProductsListParams): Promise<void> {
    runInAction(async () => {
      this._requests++;
      const requestNumber = this._requests;
      if (params.clear) {
        this._expected = 0;
        this._lastClear = requestNumber;
      }
      this._expected += params.batchSize;
      this._meta = Meta.loading;
      try {
        const response = await axios({
          method: 'get',
          url: config.PRODUCTS_URL,
          params: {
            offset: this._expected - params.batchSize,
            limit: params.batchSize,
            include: params.categories.join('|'),
            substring: params.substring,
          },
        });
        const normalized = normalizeProductsList(response.data);
        if (params.clear) {
          this.clear();
        }
        this._meta = Meta.success;

        if (requestNumber >= this._lastClear) {
          this._list.add(normalized.products);
          this._total = normalized.total;
          this._callback?.(this._list);
          this._callbackTotal?.(this._total);
        }
      } catch {
        this._meta = Meta.error;
      }
    });
  }

  destroy(): void {
    this._callback = null;
    this._callbackTotal = null;
  }
}
