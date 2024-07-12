import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SectorsService } from '../services/sectors.service';
import { CreateSectorDto, UpdateSectorDto } from '../dto';
import { SectorEntity } from '../entities/sector.entity';
import { PageDto, PageOptionsDto } from '../../../common/dtos';

@Controller('sectors')
export class SectorsController {
  constructor(private readonly sectorsService: SectorsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createSectorDto: CreateSectorDto): Promise<SectorEntity> {
    return this.sectorsService.create(createSectorDto);
  }

  @Get()
  findAll(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<SectorEntity>> {
    return this.sectorsService.findAll(pageOptionsDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<SectorEntity> {
    return this.sectorsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateSectorDto: UpdateSectorDto,
  ): Promise<SectorEntity> {
    return this.sectorsService.update(id, updateSectorDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<SectorEntity> {
    return this.sectorsService.remove(id);
  }
}
