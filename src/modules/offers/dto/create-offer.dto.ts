import { IsNotEmpty, IsOptional } from 'class-validator';
import { OfferModel } from '../models/offer.model';

export class CreateOfferDto implements OfferModel {
  @IsNotEmpty({ message: 'El título es requerido' })
  title: string;

  @IsNotEmpty({ message: 'La descripción es requerida' })
  description: string;

  @IsOptional()
  country?: string;

  @IsOptional()
  state?: string;

  @IsOptional()
  city?: string;

  @IsNotEmpty({ message: 'El precio es requerido' })
  price: number;

  @IsOptional()
  currency?: string;

  @IsOptional()
  img?: string;
}
