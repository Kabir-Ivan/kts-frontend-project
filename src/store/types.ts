export type ProductType = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  images: Array<string>;
  category: string;
  price: number;
};

export type SearchOptions = {
  include: Array<string>;
  substring: string;
};

export type CategoryType = {
  id: number;
  name: string;
};

export enum Meta {
  initial = 'initial',
  loading = 'loading',
  error = 'error',
  success = 'success',
}

export interface ILocalStore {
  destroy(): void;
}
