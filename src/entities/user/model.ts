import { IUser } from './client';
import { UserApi } from './server';

class UserModel implements IUser {
  id: string;
  name: string;
  email: string;

  constructor(data: UserApi) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
  }

  static fromJson(from: UserApi) {
    return new UserModel(from);
  }
}

export default UserModel;
