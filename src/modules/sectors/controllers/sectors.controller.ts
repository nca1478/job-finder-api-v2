import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SectorsService } from '../services/sectors.service';
import { CreateSectorDto, UpdateSectorDto } from '../dto';
import { SectorEntity } from '../entities/sector.entity';

@Controller('sectors')
export class SectorsController {
  constructor(private readonly sectorsService: SectorsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createSectorDto: CreateSectorDto): Promise<SectorEntity> {
    return this.sectorsService.create(createSectorDto);
  }

  @Get()
  findAll() {
    return this.sectorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sectorsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSectorDto: UpdateSectorDto) {
    return this.sectorsService.update(+id, updateSectorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sectorsService.remove(+id);
  }
}
