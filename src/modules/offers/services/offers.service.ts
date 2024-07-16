import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateOfferDto, UpdateOfferDto } from '../dto';
import { PageDto, PageMetaDto, PageOptionsDto } from '../../../common/dtos';

import { OfferEntity } from '../entities/offer.entity';
import { UserEntity } from '../../../modules/users/entities/user.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(OfferEntity)
    private readonly offersRepository: Repository<OfferEntity>,
  ) {}

  async create(createOfferDto: CreateOfferDto, user: UserEntity) {
    const newOffer = this.offersRepository.create(createOfferDto);

    await this.offersRepository.save({ ...newOffer, user });

    return { ...newOffer, userId: user.id };
  }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<OfferEntity>> {
    const queryBuilder = this.offersRepository.createQueryBuilder('o');

    queryBuilder
      .orderBy('o.createdAt', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async findOne(id: string): Promise<OfferEntity> {
    const offer = await this.offersRepository.findOne({
      where: { id },
    });

    if (!offer) {
      throw new NotFoundException(
        `Oferta de trabajo con ID ${id} no fué encontrada`,
      );
    }

    return offer;
  }

  update(id: string, updateOfferDto: UpdateOfferDto) {
    return `This action updates a #${id} offer`;
  }

  remove(id: string) {
    return `This action removes a #${id} offer`;
  }
}
