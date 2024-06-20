export enum roleEnum {
  admin = 'ADMIN_ROLE',
  user = 'USER_ROLE',
}

export interface UserModel {
  id?: string;
  name: string;
  email: string;
  password: string;
  role?: roleEnum;
  birthday: Date;
  profession: string;
  education: string;
  cvUrl: string;
  linkedinUser: string;
  twitterUser: string;
  instagramUser: string;
  facebookUser: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
