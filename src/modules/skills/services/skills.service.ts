import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSkillDto, UpdateSkillDto } from '../dto';
import { SkillEntity } from '../entities/skill.entity';
import { Repository } from 'typeorm';
import { PageDto, PageMetaDto, PageOptionsDto } from '../../../common/dtos';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(SkillEntity)
    private readonly skillsRepository: Repository<SkillEntity>,
  ) {}

  async create(createSkillDto: CreateSkillDto): Promise<SkillEntity> {
    const newSkill = this.skillsRepository.create(createSkillDto);

    return await this.skillsRepository.save(newSkill);
  }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<SkillEntity>> {
    const queryBuilder = this.skillsRepository.createQueryBuilder('s');

    queryBuilder
      .orderBy('s.createdAt', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async findOne(id: string): Promise<SkillEntity> {
    const skill = await this.skillsRepository.findOne({
      where: { id },
    });

    if (!skill) {
      throw new NotFoundException(`Habilidad con ID ${id} no fué encontrada`);
    }

    return skill;
  }

  async update(
    id: string,
    updateSkillDto: UpdateSkillDto,
  ): Promise<SkillEntity> {
    const skill = await this.skillsRepository.preload({
      ...updateSkillDto,
      id,
    });

    if (!skill) {
      throw new NotFoundException(`Habilidad con ID ${id} no fué encontrada`);
    }

    return await this.skillsRepository.save(skill);
  }

  async remove(id: string): Promise<SkillEntity> {
    const skill = await this.skillsRepository.findOne({
      where: { id },
    });

    if (!skill) {
      throw new NotFoundException(`Habilidad con ID ${id} no fué encontrada`);
    }

    return this.skillsRepository.remove(skill);
  }

  async preload(skills: SkillEntity[]): Promise<SkillEntity[]> {
    return await Promise.all(skills.map((skill) => this.findOne(skill.id)));
  }
}
