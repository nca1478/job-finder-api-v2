export enum roleEnum {
  admin = 'ADMIN_ROLE',
  user = 'USER_ROLE',
}

export interface UserModel {
  id: string;
  name: string;
  email: string;
  password: string;
  role: roleEnum;
  createdAt: Date;
}
