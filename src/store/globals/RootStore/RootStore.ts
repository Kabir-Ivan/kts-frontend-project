import { ProductsStore } from 'store/locals';
import { CartStore } from '../CartStore';
import { QueryParamsStore } from '../QueryParamsStore';
export default class RootStore {
  readonly query = new QueryParamsStore();
  readonly cart = new CartStore();
  readonly products = new ProductsStore();
}
