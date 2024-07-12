import { IsNotEmpty } from 'class-validator';
import { SkillModel } from '../models/skill.model';

export class CreateSkillDto implements SkillModel {
  @IsNotEmpty({ message: 'El nombre es requerido' })
  name: string;
}
