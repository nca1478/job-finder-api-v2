import { OfferEntity } from '../entities';
import { SectorEntity } from '../../../modules/sectors/entities/sector.entity';

export interface OfferSectorModel {
  id: string;
  offer: OfferEntity;
  sector: SectorEntity;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
