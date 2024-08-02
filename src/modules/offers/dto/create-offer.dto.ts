import { ArrayNotEmpty, IsNotEmpty, IsOptional } from 'class-validator';
import { OfferModel } from '../models/offer.model';
import { SkillEntity } from '../../../modules/skills/entities/skill.entity';
import { SectorEntity } from '../../../modules/sectors/entities/sector.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOfferDto implements OfferModel {
  @ApiProperty({
    description: 'Titulo',
    required: true,
    example: 'Oferta de Trabajo',
  })
  @IsNotEmpty({ message: 'El título es requerido' })
  title: string;

  @ApiProperty({
    description: 'Descripción',
    required: true,
    example: 'Una descripcion',
  })
  @IsNotEmpty({ message: 'La descripción es requerida' })
  description: string;

  @ApiProperty({ description: 'País', required: false, example: 'Venezuela' })
  @IsOptional()
  country?: string;

  @ApiProperty({ description: 'Estado', required: false, example: 'Táchira' })
  @IsOptional()
  state?: string;

  @ApiProperty({
    description: 'Ciudad',
    required: false,
    example: 'San Cristobal',
  })
  @IsOptional()
  city?: string;

  @ApiProperty({ description: 'Precio', required: false, example: '100' })
  @IsNotEmpty({ message: 'El precio es requerido' })
  price: number;

  @ApiProperty({
    description: 'Moneda',
    required: false,
    example: 'Dolar Americano (USD)',
  })
  @IsOptional()
  currency?: string;

  @ApiProperty({
    description: 'Url avatar',
    required: false,
    example: 'http://www.picture.com/123.jpg',
  })
  @IsOptional()
  img?: string;

  @ApiProperty({
    description: 'Array de ID de habilidades',
    required: true,
    default: [],
    isArray: true,
    example: [
      { id: '855b8e69-0ec3-4671-a2fd-cadd2664e8c2' },
      { id: 'f69ae758-6f47-40b8-b371-4434c59f608e' },
    ],
  })
  @ArrayNotEmpty({ message: 'Habilidades son requeridas' })
  skills: SkillEntity[];

  @ApiProperty({
    description: 'Array de ID de sectores',
    required: true,
    default: [],
    isArray: true,
    example: [
      { id: '205360fe-c152-4d6c-a053-fb1ccaf7acee' },
      { id: '30436d5e-85c0-4021-ac8b-d7f4727e0fd0' },
    ],
  })
  @ArrayNotEmpty({ message: 'Sectores son requeridos' })
  sectors: SectorEntity[];
}
