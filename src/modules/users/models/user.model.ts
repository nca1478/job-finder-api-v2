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
  img?: string;
  google?: boolean;
  facebook?: boolean;
  tokenRecovery?: string;
  profession?: string;
  birthday?: Date;
  education?: string;
  cvUrl?: string;
  linkedinUser?: string;
  twitterUser?: string;
  instagramUser?: string;
  facebookUser?: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
