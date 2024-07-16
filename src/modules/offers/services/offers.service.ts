import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOfferDto, UpdateOfferDto } from '../dto';
import { OfferEntity } from '../entities/offer.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(OfferEntity)
    private readonly offersRepository: Repository<OfferEntity>,
  ) {}

  async create(createOfferDto: CreateOfferDto) {
    const newOffer = this.offersRepository.create(createOfferDto);

    return await this.offersRepository.save(newOffer);
  }

  findAll() {
    return `This action returns all offers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} offer`;
  }

  update(id: number, updateOfferDto: UpdateOfferDto) {
    return `This action updates a #${id} offer`;
  }

  remove(id: number) {
    return `This action removes a #${id} offer`;
  }
}
