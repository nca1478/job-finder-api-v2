import { PartialType } from '@nestjs/swagger';
import { CreateOfferDto } from './create-offer.dto';
// import { PartialType } from '@nestjs/mapped-types';

export class UpdateOfferDto extends PartialType(CreateOfferDto) {}
