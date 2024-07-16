import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOfferDto, UpdateOfferDto } from '../dto';
import { OfferEntity } from '../entities/offer.entity';
import { PageDto, PageMetaDto, PageOptionsDto } from '../../../common/dtos';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(OfferEntity)
    private readonly offersRepository: Repository<OfferEntity>,
  ) {}

  async create(createOfferDto: CreateOfferDto): Promise<OfferEntity> {
    const newOffer = this.offersRepository.create(createOfferDto);

    return await this.offersRepository.save(newOffer);
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
