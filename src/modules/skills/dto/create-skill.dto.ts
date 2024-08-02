import { IsNotEmpty } from 'class-validator';
import { SkillModel } from '../models/skill.model';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSkillDto implements SkillModel {
  @ApiProperty({ description: 'Nombre', required: true, example: 'Nestjs' })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  name: string;
}
