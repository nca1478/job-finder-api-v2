import { roleEnum } from '../../../modules/users/models/user.model';

export interface JwtPayload {
  id: string;
  name: string;
  email: string;
  role?: roleEnum;
  img?: string;
  google?: boolean;
  facebook?: boolean;
  createdAt?: Date;
}
