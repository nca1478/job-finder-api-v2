import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSectorDto, UpdateSectorDto } from '../dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SectorEntity } from '../entities/sector.entity';
import { Repository } from 'typeorm';
import { PageDto, PageMetaDto, PageOptionsDto } from '../../../common/dtos';

@Injectable()
export class SectorsService {
  constructor(
    @InjectRepository(SectorEntity)
    private readonly sectorsRepository: Repository<SectorEntity>,
  ) {}

  async create(createSectorDto: CreateSectorDto): Promise<SectorEntity> {
    const newSector = this.sectorsRepository.create(createSectorDto);

    return await this.sectorsRepository.save(newSector);
  }

  async findAll(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<SectorEntity>> {
    const queryBuilder = this.sectorsRepository.createQueryBuilder('s');

    queryBuilder
      .orderBy('s.createdAt', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async findOne(id: string): Promise<SectorEntity> {
    const sector = await this.sectorsRepository.findOne({
      where: { id },
    });

    if (!sector) {
      throw new NotFoundException(`Habilidad con ID ${id} no fué encontrada`);
    }

    return sector;
  }

  update(id: number, updateSectorDto: UpdateSectorDto) {
    return `This action updates a #${id} sector`;
  }

  remove(id: number) {
    return `This action removes a #${id} sector`;
  }
}
