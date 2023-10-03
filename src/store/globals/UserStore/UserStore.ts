import axios from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';
import config from 'config/config';
import UserModel from 'entities/user';
import RootStore from 'store/globals';
import { Meta } from 'store/types';

export type LoginParams = {
  email: string;
  password: string;
};

export type SignupParams = {
  name: string;
  email: string;
  password: string;
};

export interface IUserStore {
  getUser: () => Promise<void>;
  login: (params: LoginParams) => Promise<void>;
  signup: (params: SignupParams) => Promise<void>;
}

export class UserStore {
  private _user?: UserModel;
  private _meta: Meta = Meta.initial;
  private _loggedIn: boolean = false;
  private _errorMessage: string = '';

  constructor() {
    makeAutoObservable(this);
    this.getUser();
  }

  get meta() {
    return this._meta;
  }

  get isLoaded() {
    return this._meta == Meta.success;
  }

  get isLoggedIn() {
    return this._loggedIn;
  }

  get isError() {
    return this._meta == Meta.error;
  }

  get user() {
    return this._user;
  }

  get errorMessage() {
    return this._errorMessage;
  }

  get ordersList() {
    if (this._user && RootStore.products.isLoaded) {
      console.log(this._user.orders);
      return this._user.orders.map((order) => ({
        id: order.id,
        status: order.status,
        items: order.items.map((item) => ({
          product: RootStore.products.list.getByKey(item.id),
          amount: item.amount,
        })),
      }));
    }
    return [];
  }

  async getUser(): Promise<void> {
    if (this._meta === Meta.loading) {
      return;
    }

    this._meta = Meta.loading;
    try {
      const response = await axios({
        method: 'get',
        url: config.API.USER_URL,
      });
      if (response.data.user) {
        runInAction(() => {
          this._user = UserModel.fromJson(response.data.user);
          this._meta = Meta.success;
        });
        this._loggedIn = true;
      }
      if (response.data.error) {
        this._meta = Meta.error;
      }
    } catch {
      this._meta = Meta.error;
    }
  }

  async login(params: LoginParams, callback: () => void): Promise<void> {
    if (this._meta === Meta.loading) {
      return;
    }

    this._meta = Meta.loading;
    try {
      const response = await axios({
        method: 'post',
        url: config.API.LOGIN_URL,
        data: params,
      });
      if (response.data.user) {
        runInAction(() => {
          this._user = UserModel.fromJson(response.data.user);
          this._meta = Meta.success;
        });
        this._loggedIn = true;
        callback();
      }
      if (response.data.error) {
        this._meta = Meta.error;
        this._errorMessage = response.data.error;
      } else {
        this._errorMessage = '';
      }
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this._errorMessage = (error as any).response ? (error as any).response.data.error : 'Unknown error occurred';
      this._meta = Meta.error;
    }
  }

  async signup(params: SignupParams, callback: () => void): Promise<void> {
    if (this._meta === Meta.loading) {
      return;
    }

    this._meta = Meta.loading;
    try {
      const response = await axios({
        method: 'post',
        url: config.API.SIGNUP_URL,
        data: params,
      });
      if (response.data.user) {
        runInAction(() => {
          this._user = UserModel.fromJson(response.data.user);
          this._meta = Meta.success;
        });
        this._loggedIn = true;
        callback();
      }
      if (response.data.error) {
        this._meta = Meta.error;
        this._errorMessage = response.data.error;
      } else {
        this._errorMessage = '';
      }
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this._errorMessage = (error as any).response ? (error as any).response.data.error : 'Unknown error occurred';
      this._meta = Meta.error;
    }
  }
}
