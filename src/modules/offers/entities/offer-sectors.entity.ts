import { Entity, ManyToOne } from 'typeorm';

import { ColumnCommonEntity } from '../../../common/entities/column-common.entity';
import { OfferEntity as Offer } from './index';
import { SectorEntity as Sector } from '../../../modules/sectors/entities/sector.entity';
import { OfferSectorModel } from '../models';

@Entity('offer_sectors')
export class OfferSectorsEntity
  extends ColumnCommonEntity
  implements OfferSectorModel
{
  // Relaciones
  @ManyToOne(() => Offer, (offer) => offer.offerSector)
  offer: Offer;

  @ManyToOne(() => Sector, (sector) => sector.offerSector)
  sector: Sector;
}
