import { CategoriesStore, ProductsStore } from 'store/locals';
import { CartStore } from '../CartStore';
import { QueryParamsStore } from '../QueryParamsStore';
import { UserStore } from '../UserStore';
export default class RootStore {
  readonly query = new QueryParamsStore();
  readonly products = new ProductsStore();
  readonly categories = new CategoriesStore();
  readonly user = new UserStore();
  readonly cart = new CartStore();
  constructor() {
    setInterval(() => {
      this.user.getUser();
    }, 5000);
  }
}
