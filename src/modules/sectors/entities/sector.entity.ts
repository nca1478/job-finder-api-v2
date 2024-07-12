import { randomUUID } from 'crypto';
import { BeforeInsert, Column, Entity } from 'typeorm';
import { ColumnCommonEntity } from '../../../common/entities/column-common.entity';
import { SectorModel } from '../models/sector.model';

@Entity('sectors')
export class SectorEntity extends ColumnCommonEntity implements SectorModel {
  @Column('varchar')
  name: string;

  @Column('bool', { default: true })
  active?: boolean;

  @BeforeInsert()
  generatedId() {
    if (this.id) {
      return;
    }
    this.id = randomUUID();
  }
}
