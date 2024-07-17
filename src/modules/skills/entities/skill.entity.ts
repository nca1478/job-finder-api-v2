import { randomUUID } from 'crypto';
import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import { ColumnCommonEntity } from '../../../common/entities/column-common.entity';
import { SkillModel } from '../models/skill.model';
import { OfferSkillsEntity as OfferSkill } from '../../../modules/offers/entities';

@Entity('skills')
export class SkillEntity extends ColumnCommonEntity implements SkillModel {
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

  // Relaciones
  @OneToMany(() => OfferSkill, (offerSkill) => offerSkill.skill, {
    lazy: true,
  })
  offerSkill: OfferSkill[];
}
