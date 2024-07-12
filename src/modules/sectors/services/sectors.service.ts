import { Injectable } from '@nestjs/common';
import { CreateSectorDto, UpdateSectorDto } from '../dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SectorEntity } from '../entities/sector.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SectorsService {
  constructor(
    @InjectRepository(SectorEntity)
    private readonly skillsRepository: Repository<SectorEntity>,
  ) {}

  async create(createSectorDto: CreateSectorDto): Promise<SectorEntity> {
    const newSector = this.skillsRepository.create(createSectorDto);

    return await this.skillsRepository.save(newSector);
  }

  findAll() {
    return `This action returns all sectors`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sector`;
  }

  update(id: number, updateSectorDto: UpdateSectorDto) {
    return `This action updates a #${id} sector`;
  }

  remove(id: number) {
    return `This action removes a #${id} sector`;
  }
}
