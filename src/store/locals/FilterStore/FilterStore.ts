import { action, computed, makeObservable, observable } from 'mobx';
import { Option } from 'components/MultiDropdown';
import CategoryModel from 'entities/category';
import RootStore from 'store/globals';
import { CategoriesStore } from 'store/locals';
import { ILocalStore } from 'store/types';

export type FiltersType = {
  input?: string;
  dropdown?: Option[];
};

export interface IFilterStore {
  setFilters: (filters: FiltersType) => void;
}

type PrivateFields = '_input' | '_dropdown';

export class FilterStore implements IFilterStore, ILocalStore {
  private _input: string = '';
  private _dropdown: Option[] = [];
  private _categoriesLoader: CategoriesStore = new CategoriesStore();

  constructor() {
    makeObservable<FilterStore, PrivateFields>(this, {
      _input: observable,
      _dropdown: observable,
      input: computed,
      dropdown: computed,
      fetchFilters: action,
      setFilters: action,
    });
    this._categoriesLoader.getCategoriesList().then(() => {
      this.fetchFilters();
    });
  }

  get input(): string {
    return this._input;
  }

  get dropdown(): Option[] {
    return this._dropdown;
  }

  fetchFilters = () => {
    this._input = RootStore.query.getParam('substring')?.toString() || '';
    this._dropdown = this._categoriesLoader.list
      .asList()
      .map((category: CategoryModel) => {
        return { key: String(category.id), value: category.name };
      })
      .filter((option: Option) => RootStore.query.getParam('include')?.toString().split('|').includes(option.key));
    if (this._dropdown.length == 0) {
      this._dropdown = this._categoriesLoader.list.asList().map((category: CategoryModel) => {
        return { key: String(category.id), value: category.name };
      });
    }
  };

  setFilters = (filters: FiltersType) => {
    this._input = filters.input != undefined ? filters.input : this._input;
    this._dropdown = filters.dropdown || this._dropdown;
    const params: Record<string, string> = {
      include: this._dropdown.map((el) => el.key).join('|'),
      substring: this._input,
    };
    RootStore.query.setSearch(
      Object.keys(params)
        .map((k: string) => `${k}=${params[k]}`)
        .join('&'),
    );
  };

  destroy(): void {}
}
