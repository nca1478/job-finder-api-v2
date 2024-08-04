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
  Put,
  UseInterceptors,
  UploadedFile,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';

import {
  CreateOfferDto,
  UpdateOfferDto,
  QueryParamsOptionsDto,
  SearchDto,
} from '../dto';
import { ApiQueryPagination, GetUser } from '../../../common/decorators';
import { PageDto, PageOptionsDto } from '../../../common/dtos';
import { FileValidatorPipe } from 'src/common/pipes';
import { CloudinaryService } from '../../../common/modules/cloudinary/services/cloudinary.service';
import { OffersService } from '../services/offers.service';
import { OfferEntity } from '../entities/offer.entity';
import { UserEntity } from '../../../modules/users/entities/user.entity';

@ApiTags('Ofertas de Trabajo')
@Controller('offers')
export class OffersController {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly offersService: OffersService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear nueva oferta de trabajo' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createOfferDto: CreateOfferDto, @GetUser() user: UserEntity) {
    return this.offersService.create(createOfferDto, user);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las ofertas del usuario' })
  @ApiBearerAuth()
  @ApiQueryPagination()
  @UseGuards(AuthGuard('jwt'))
  findAll(
    @Query() pageOptionsDto: PageOptionsDto,
    @GetUser() user: UserEntity,
  ): Promise<PageDto<OfferEntity>> {
    return this.offersService.findAll(pageOptionsDto, user, null);
  }

  @Post('/published')
  @ApiOperation({ summary: 'Listar todas las ofertas publicadas' })
  @ApiQueryPagination()
  findAllPublished(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<OfferEntity>> {
    return this.offersService.findAll(pageOptionsDto, null, null);
  }

  @Post('/search')
  @ApiOperation({ summary: 'Buscar ofertas de trabajo por título' })
  @ApiQueryPagination()
  @HttpCode(HttpStatus.OK)
  search(
    @Query() pageOptionsDto: PageOptionsDto,
    @Body() searchDto: SearchDto,
  ): Promise<PageDto<OfferEntity>> {
    return this.offersService.findAll(pageOptionsDto, null, searchDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar oferta de trabajo por id' })
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<any> {
    return this.offersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar oferta' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateOfferDto: UpdateOfferDto,
  ) {
    return this.offersService.update(id, updateOfferDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar oferta' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const { img: currentFile } = await this.offersService.findOne(id);

    if (currentFile) await this.cloudinaryService.removeFile(currentFile);

    return this.offersService.remove(id);
  }

  @Put(':id/publish')
  @ApiOperation({ summary: 'Publicar oferta' })
  publish(
    @Param('id', ParseUUIDPipe) id: string,
    @Query() queryParamOptionsDto: QueryParamsOptionsDto,
  ) {
    return this.offersService.publish(id, queryParamOptionsDto);
  }

  @Post(':id/upload-file')
  @ApiOperation({ summary: 'Subir archivo (pdf o jpeg)' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile('file', FileValidatorPipe) file: Express.Multer.File,
  ) {
    const { img: currentFile } = await this.offersService.findOne(id);

    if (currentFile) await this.cloudinaryService.removeFile(currentFile);

    return await this.cloudinaryService.uploadFile(file);
  }
}
