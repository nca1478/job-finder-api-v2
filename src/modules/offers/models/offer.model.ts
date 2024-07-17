import { UserEntity } from '../../../modules/users/entities/user.entity';

export interface OfferModel {
  id?: string;
  title: string;
  description: string;
  country?: string;
  state?: string;
  city?: string;
  price: number;
  currency?: string;
  img?: string;
  published?: boolean;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  user?: UserEntity;
}
