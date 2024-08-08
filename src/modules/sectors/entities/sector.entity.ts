import { Column, Entity, OneToMany } from 'typeorm';
import { SectorModel } from '../models/sector.model';

import { ColumnCommonEntity } from '../../../common/entities/column-common.entity';
import { OfferSectorsEntity as OfferSector } from '../../../modules/offers/entities';

@Entity('sectors')
export class SectorEntity extends ColumnCommonEntity implements SectorModel {
  @Column('varchar')
  name: string;

  @Column('bool', { default: true })
  active?: boolean;

  // Relaciones
  @OneToMany(() => OfferSector, (offerSector) => offerSector.sector, {
    lazy: true,
  })
  offerSector: OfferSector[];
}
