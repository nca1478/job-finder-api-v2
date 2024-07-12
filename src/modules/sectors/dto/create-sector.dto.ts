import { IsNotEmpty } from 'class-validator';
import { SectorModel } from '../models/sector.model';

export class CreateSectorDto implements SectorModel {
  @IsNotEmpty({ message: 'El nombre es requerido' })
  name: string;
}
