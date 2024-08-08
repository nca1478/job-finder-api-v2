import { Entity, ManyToOne } from 'typeorm';
import { ColumnCommonEntity } from '../../../common/entities/column-common.entity';

import { OfferEntity as Offer } from './index';
import { SkillEntity as Skill } from '../../../modules/skills/entities/skill.entity';
import { OfferSkillModel } from '../models';

@Entity('offer_skills')
export class OfferSkillsEntity
  extends ColumnCommonEntity
  implements OfferSkillModel
{
  // Relaciones
  @ManyToOne(() => Offer, (offer) => offer.offerSkill)
  offer: Offer;

  @ManyToOne(() => Skill, (skill) => skill.offerSkill)
  skill: Skill;
}
