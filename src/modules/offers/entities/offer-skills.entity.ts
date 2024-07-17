import { randomUUID } from 'crypto';
import { BeforeInsert, Entity, ManyToOne } from 'typeorm';
import { ColumnCommonEntity } from '../../../common/entities/column-common.entity';

import { OfferEntity as Offer } from './index';
import { SkillEntity as Skill } from '../../../modules/skills/entities/skill.entity';
import { OfferSkillModel } from '../models';

@Entity('offer_skills')
export class OfferSkillsEntity
  extends ColumnCommonEntity
  implements OfferSkillModel
{
  @BeforeInsert()
  generatedId() {
    if (this.id) {
      return;
    }
    this.id = randomUUID();
  }

  // Relaciones
  @ManyToOne(() => Offer, (offer) => offer.offerSkill, { lazy: true })
  offer: Offer;

  @ManyToOne(() => Skill, (skill) => skill.offerSkill, { lazy: true })
  skill: Skill;
}
