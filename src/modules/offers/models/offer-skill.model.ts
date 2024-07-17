import { OfferEntity } from '../entities';
import { SkillEntity } from '../../../modules/skills/entities/skill.entity';

export interface OfferSkillModel {
  id: string;
  offer: OfferEntity;
  skill: SkillEntity;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
