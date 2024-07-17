import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateOfferDto, UpdateOfferDto } from '../dto';
import { PageDto, PageMetaDto, PageOptionsDto } from '../../../common/dtos';

import { OfferEntity, OfferSkillsEntity } from '../entities';
import { UserEntity } from '../../../modules/users/entities/user.entity';
import { SkillEntity } from '../../../modules/skills/entities/skill.entity';

import { SkillsService } from '../../../modules/skills/services/skills.service';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(OfferEntity)
    private readonly offersRepository: Repository<OfferEntity>,
    @InjectRepository(OfferSkillsEntity)
    private readonly offerSkillsRepository: Repository<OfferSkillsEntity>,
    private readonly skillsService: SkillsService,
  ) {}

  async create(createOfferDto: CreateOfferDto, user: UserEntity): Promise<any> {
    const newOffer = this.offersRepository.create(createOfferDto);
    const skills = await this.preloadSkills(createOfferDto.skills);

    const offer = await this.offersRepository.save({ ...newOffer, user });

    // Agregando skills a la oferta
    const offerSkills = await this.createOfferSkills(offer, skills);
    await this.offerSkillsRepository.save(offerSkills);

    return { ...newOffer, userId: user.id };
  }

  async findAll(
    pageOptionsDto: PageOptionsDto,
    user: UserEntity,
  ): Promise<PageDto<OfferEntity>> {
    const queryBuilder = this.offersRepository.createQueryBuilder('o');

    queryBuilder
      .innerJoinAndSelect('o.user', 'user')
      .where('user.id = :id', { id: user.id })
      .orderBy('o.createdAt', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    const responseEntities: any = entities.map((entity) => {
      delete entity.user;

      return {
        ...entity,
        userId: user.id,
      };
    });

    return new PageDto(responseEntities, pageMetaDto);
  }

  async findOne(id: string): Promise<any> {
    const offer = await this.offersRepository.findOne({
      where: { id },
    });
    const userId = offer.user.id;

    if (!offer) {
      throw new NotFoundException(
        `Oferta de trabajo con ID ${id} no fué encontrada`,
      );
    }

    delete offer.user;

    return { ...offer, userId };
  }

  update(id: string, updateOfferDto: UpdateOfferDto) {
    return `This action updates a #${id} offer`;
  }

  remove(id: string) {
    return `This action removes a #${id} offer`;
  }

  private async preloadSkills(skills: SkillEntity[]) {
    return await Promise.all(
      skills.map(async (skill) => await this.skillsService.findOne(skill.id)),
    );
  }

  private async createOfferSkills(
    offer: OfferEntity,
    skills: SkillEntity[],
  ): Promise<OfferSkillsEntity[]> {
    return skills.map((skill) =>
      this.offerSkillsRepository.create({ offer, skill }),
    );
  }
}
