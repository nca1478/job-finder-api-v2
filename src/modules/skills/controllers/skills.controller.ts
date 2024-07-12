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
import { SkillsService } from '../services/skills.service';
import { CreateSkillDto, UpdateSkillDto } from '../dto';
import { SkillEntity } from '../entities/skill.entity';
import { PageDto, PageOptionsDto } from '../../../common/dtos';
import { AuthGuard } from '@nestjs/passport';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createSkillDto: CreateSkillDto): Promise<SkillEntity> {
    return this.skillsService.create(createSkillDto);
  }

  @Get()
  findAll(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<SkillEntity>> {
    return this.skillsService.findAll(pageOptionsDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<SkillEntity> {
    return this.skillsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateSkillDto: UpdateSkillDto,
  ): Promise<SkillEntity> {
    return this.skillsService.update(id, updateSkillDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<SkillEntity> {
    return this.skillsService.remove(id);
  }
}
