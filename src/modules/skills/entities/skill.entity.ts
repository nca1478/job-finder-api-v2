import { Column, Entity, OneToMany } from 'typeorm';
import { SkillModel } from '../models/skill.model';

import { ColumnCommonEntity } from '../../../common/entities/column-common.entity';
import { OfferSkillsEntity as OfferSkill } from '../../../modules/offers/entities';

@Entity('skills')
export class SkillEntity extends ColumnCommonEntity implements SkillModel {
  @Column('varchar')
  name: string;

  @Column('bool', { default: true })
  active?: boolean;

  // Relaciones
  @OneToMany(() => OfferSkill, (offerSkill) => offerSkill.skill, {
    lazy: true,
  })
  offerSkill: OfferSkill[];
}
