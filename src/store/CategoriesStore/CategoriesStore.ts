import axios from 'axios';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import config from 'config/config';
import { ILocalStore, Meta } from 'store/types';
import Collection from '../models/shared/Collection';
import { normalizeCategoriesList } from './../models/CategoriesListModel';
import { CategoryModel } from './../models/CategoryModel';

export interface ICategoriesStore {
  getCategoriesList(): Promise<void>;
}

type PrivateFields = '_list' | '_meta' | '_total';
export default class CategoriesStore implements ICategoriesStore, ILocalStore {
  private _list: Collection<number, CategoryModel> = new Collection<number, CategoryModel>([], (element) => element.id);
  private _meta: Meta = Meta.initial;
  private _callback: ((items: Collection<number, CategoryModel>) => void) | null;
  private _total: number = 0;

  constructor(callback: (items: Collection<number, CategoryModel>) => void) {
    this._callback = callback;
    makeObservable<CategoriesStore, PrivateFields>(this, {
      _list: observable,
      _meta: observable,
      _total: observable,
      list: computed,
      meta: computed,
      total: computed,
      getCategoriesList: action,
    });
  }

  get list(): Collection<number, CategoryModel> {
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

  async getCategoriesList(): Promise<void> {
    runInAction(async () => {
      this._meta = Meta.loading;
      this._list.clear();
      try {
        const response = await axios({
          method: 'get',
          url: config.CATEGORIES_URL,
        });
        const normalized = normalizeCategoriesList(response.data);
        this._meta = Meta.success;
        this._list.add(normalized.categories);
        this._callback?.(this.list);
        this._total = normalized.categories.length;
      } catch {
        this._meta = Meta.error;
      }
    });
  }

  destroy(): void {
    this._callback = null;
  }
}
