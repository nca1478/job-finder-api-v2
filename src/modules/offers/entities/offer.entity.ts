import { randomUUID } from 'crypto';
import { BeforeInsert, Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { OfferModel } from '../models/offer.model';

import { ColumnCommonEntity } from '../../../common/entities/column-common.entity';
import { UserEntity as User } from '../../../modules/users/entities/user.entity';
import { OfferSkillsEntity as OfferSkill } from './index';
import { OfferSectorsEntity as OfferSector } from './index';

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

  // Relaciones
  @ManyToOne(() => User, (user) => user.offer, { eager: true })
  user: User;

  @OneToMany(() => OfferSkill, (offerSkill) => offerSkill.offer)
  offerSkill: OfferSkill[];

  @OneToMany(() => OfferSector, (offerSector) => offerSector.offer)
  offerSector: OfferSector[];
}
