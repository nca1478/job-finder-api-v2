import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { SkillsService } from '../services/skills.service';
import { CreateSkillDto, UpdateSkillDto } from '../dto';
import { SkillEntity } from '../entities/skill.entity';
import { PageDto, PageOptionsDto } from '../../../common/dtos';

@ApiTags('Habilidades')
@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear nueva habilidad' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createSkillDto: CreateSkillDto): Promise<SkillEntity> {
    return this.skillsService.create(createSkillDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las habilidades' })
  findAll(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<SkillEntity>> {
    return this.skillsService.findAll(pageOptionsDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Mostrar habilidad por id' })
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<SkillEntity> {
    return this.skillsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar habilidad' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateSkillDto: UpdateSkillDto,
  ): Promise<SkillEntity> {
    return this.skillsService.update(id, updateSkillDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar habilidad' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<SkillEntity> {
    return this.skillsService.remove(id);
  }
}
