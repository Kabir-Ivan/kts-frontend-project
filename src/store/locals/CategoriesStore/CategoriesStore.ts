import axios from 'axios';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import config from 'config/config';
import CategoryModel, { CategoryApi } from 'entities/category';
import Collection from 'entities/shared';
import { ILocalStore, Meta } from 'store/types';

export interface ICategoriesStore {
  getCategoriesList(): Promise<void>;
}

type PrivateFields = '_list' | '_meta' | '_total';
export class CategoriesStore implements ICategoriesStore, ILocalStore {
  private _list: Collection<number, CategoryModel> = new Collection<number, CategoryModel>([], (element) => element.id);
  private _meta: Meta = Meta.initial;
  private _total: number = 0;

  constructor() {
    makeObservable<CategoriesStore, PrivateFields>(this, {
      _list: observable,
      _meta: observable,
      _total: observable,
      list: computed,
      meta: computed,
      total: computed,
      isLoaded: computed,
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

  get isLoaded(): boolean {
    return this._meta == Meta.success;
  }

  clear = (): void => {
    this._meta = Meta.initial;
    this._list.clear();
    this._total = 0;
  };

  async getCategoriesList(): Promise<void> {
    if (this._meta === Meta.loading) {
      return;
    }

    this._meta = Meta.loading;
    this._list.clear();
    try {
      const response = await axios({
        method: 'get',
        url: config.API.CATEGORIES_URL,
      });
      const normalized = response.data.categories.map((category: CategoryApi) => CategoryModel.fromJson(category));
      runInAction(() => {
        this._meta = Meta.success;
        this._list.add(normalized);
        this._total = normalized.length;
      });
    } catch {
      this._meta = Meta.error;
    }
  }

  destroy(): void {}
}
