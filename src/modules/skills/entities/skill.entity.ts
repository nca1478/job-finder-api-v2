import { randomUUID } from 'crypto';
import { BeforeInsert, Column, Entity } from 'typeorm';
import { ColumnCommonEntity } from '../../../common/entities/column-common.entity';
import { SkillModel } from '../models/skill.model';

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
}
