import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateOfferDto, UpdateOfferDto } from '../dto';
import { PageDto, PageMetaDto, PageOptionsDto } from '../../../common/dtos';

import {
  OfferEntity,
  OfferSectorsEntity,
  OfferSkillsEntity,
} from '../entities';
import { UserEntity } from '../../../modules/users/entities/user.entity';
import { SkillEntity } from '../../../modules/skills/entities/skill.entity';
import { SectorEntity } from '../../../modules/sectors/entities/sector.entity';

import { SkillsService } from '../../../modules/skills/services/skills.service';
import { SectorsService } from '../../../modules/sectors/services/sectors.service';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(OfferEntity)
    private readonly offersRepository: Repository<OfferEntity>,
    @InjectRepository(OfferSkillsEntity)
    private readonly offerSkillsRepository: Repository<OfferSkillsEntity>,
    @InjectRepository(OfferSectorsEntity)
    private readonly offerSectorsRepository: Repository<OfferSectorsEntity>,

    private readonly skillsService: SkillsService,
    private readonly sectorsService: SectorsService,
  ) {}

  async create(createOfferDto: CreateOfferDto, user: UserEntity): Promise<any> {
    const newOffer = this.offersRepository.create(createOfferDto);
    const skills = await this.skillsService.preload(createOfferDto.skills);
    const sectors = await this.sectorsService.preload(createOfferDto.sectors);

    const offer = await this.offersRepository.save({ ...newOffer, user });

    // Agregando skills a la oferta
    const offerSkills = this.createOfferSkills(offer, skills);
    await this.offerSkillsRepository.save(offerSkills);

    // Agregando sectors a la oferta
    const offerSectors = this.createOfferSectors(offer, sectors);
    await this.offerSectorsRepository.save(offerSectors);

    delete offer.user;

    return { ...offer, userId: user.id };
  }

  async findAll(
    pageOptionsDto: PageOptionsDto,
    user: UserEntity,
  ): Promise<PageDto<OfferEntity>> {
    const queryBuilder = this.offersRepository.createQueryBuilder('o');

    queryBuilder
      .innerJoinAndSelect('o.user', 'user')
      .innerJoinAndSelect('o.offerSkill', 'osk')
      .innerJoinAndSelect('osk.skill', 'skill')
      .innerJoinAndSelect('o.offerSector', 'ose')
      .innerJoinAndSelect('ose.sector', 'sector')
      .where('user.id = :id', { id: user.id })
      .orderBy('o.createdAt', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    const responseEntities: any = entities.map((entity) => {
      const skills = entity.offerSkill.map(({ skill }) => {
        return skill;
      });

      const sectors = entity.offerSector.map(({ sector }) => {
        return sector;
      });

      delete entity.offerSector;
      delete entity.offerSkill;
      delete entity.user;

      return {
        ...entity,
        userId: user.id,
        skills,
        sectors,
      };
    });

    return new PageDto(responseEntities, pageMetaDto);
  }

  async findOne(id: string): Promise<any> {
    const offer = await this.offersRepository
      .createQueryBuilder('o')
      .innerJoinAndSelect('o.user', 'user')
      .innerJoinAndSelect('o.offerSkill', 'osk')
      .innerJoinAndSelect('osk.skill', 'skill')
      .innerJoinAndSelect('o.offerSector', 'ose')
      .innerJoinAndSelect('ose.sector', 'sector')
      .where('o.id = :id', { id })
      .getOne();

    const userId = offer.user.id;

    const skills = offer.offerSkill.map(({ skill }) => {
      return skill;
    });

    const sectors = offer.offerSector.map(({ sector }) => {
      return sector;
    });

    delete offer.offerSector;
    delete offer.offerSkill;
    delete offer.user;

    if (!offer) {
      throw new NotFoundException(
        `Oferta de trabajo con ID ${id} no fué encontrada`,
      );
    }

    return { ...offer, userId, skills, sectors };
  }

  update(id: string, updateOfferDto: UpdateOfferDto) {
    return `This action updates a #${id} offer`;
  }

  remove(id: string) {
    return `This action removes a #${id} offer`;
  }

  private createOfferSkills(
    offer: OfferEntity,
    skills: SkillEntity[],
  ): OfferSkillsEntity[] {
    return skills.map((skill) =>
      this.offerSkillsRepository.create({ offer, skill }),
    );
  }

  private createOfferSectors(
    offer: OfferEntity,
    sectors: SectorEntity[],
  ): OfferSectorsEntity[] {
    return sectors.map((sector) =>
      this.offerSectorsRepository.create({ offer, sector }),
    );
  }
}
