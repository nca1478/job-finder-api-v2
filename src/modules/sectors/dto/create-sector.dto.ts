import { IsNotEmpty } from 'class-validator';
import { SectorModel } from '../models/sector.model';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSectorDto implements SectorModel {
  @ApiProperty({
    description: 'Nombre',
    required: true,
    example: 'Informática',
  })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  name: string;
}
