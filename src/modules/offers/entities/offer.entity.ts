import { randomUUID } from 'crypto';
import { BeforeInsert, Column, Entity } from 'typeorm';
import { ColumnCommonEntity } from '../../../common/entities/column-common.entity';
import { OfferModel } from '../models/offer.model';

@Entity('offers')
export class OfferEntity extends ColumnCommonEntity implements OfferModel {
  @Column('varchar')
  title: string;

  @Column('text')
  description: string;

  @Column('varchar', { nullable: true })
  country: string;

  @Column('varchar', { nullable: true })
  state: string;

  @Column('varchar', { nullable: true })
  city: string;

  @Column('numeric', { default: 0 })
  price: number;

  @Column('varchar')
  currency: string;

  @Column('varchar', { nullable: true })
  img: string;

  @Column('bool', { default: false })
  published: boolean;

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
