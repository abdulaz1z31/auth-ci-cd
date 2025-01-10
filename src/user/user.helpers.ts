import { User } from './entities/user.entity';

export enum Roles {
  user = 'user',
  admin = 'admin',
  superAdmin = 'superAdmin',
}

export type updateUserType = {
  message: string;
  user: User;
};

export type deleteUser = {
  message: string;
};
