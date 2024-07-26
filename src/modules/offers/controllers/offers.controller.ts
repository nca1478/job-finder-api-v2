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
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  CreateOfferDto,
  BodyOptionsDto,
  UpdateOfferDto,
  QueryParamsOptionsDto,
} from '../dto';
import { GetUser } from '../../../common/decorators';
import { PageDto, PageOptionsDto } from '../../../common/dtos';
import { FileValidatorPipe } from 'src/common/pipes';

import { CloudinaryService } from '../../../common/modules/cloudinary/services/cloudinary.service';
import { OffersService } from '../services/offers.service';

import { OfferEntity } from '../entities/offer.entity';
import { UserEntity } from '../../../modules/users/entities/user.entity';

@Controller('offers')
export class OffersController {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly offersService: OffersService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createOfferDto: CreateOfferDto, @GetUser() user: UserEntity) {
    return this.offersService.create(createOfferDto, user);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(
    @Query() pageOptionsDto: PageOptionsDto,
    @GetUser() user: UserEntity,
  ): Promise<PageDto<OfferEntity>> {
    return this.offersService.findAll(pageOptionsDto, null, user);
  }

  @Post('/published')
  findAllPublished(
    @Query() pageOptionsDto: PageOptionsDto,
    @Body() bodyOptionsDto: BodyOptionsDto,
  ): Promise<PageDto<OfferEntity>> {
    return this.offersService.findAll(pageOptionsDto, bodyOptionsDto, null);
  }

  @Post('/search')
  search(
    @Query() pageOptionsDto: PageOptionsDto,
    @Body() bodyOptionsDto: BodyOptionsDto,
  ): Promise<PageDto<OfferEntity>> {
    return this.offersService.findAll(pageOptionsDto, bodyOptionsDto, null);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<any> {
    return this.offersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateOfferDto: UpdateOfferDto,
  ) {
    return this.offersService.update(id, updateOfferDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const { img: currentFile } = await this.offersService.findOne(id);

    if (currentFile) await this.cloudinaryService.removeFile(currentFile);

    return this.offersService.remove(id);
  }

  @Put(':id/publish')
  publish(
    @Param('id', ParseUUIDPipe) id: string,
    @Query() queryParamOptionsDto: QueryParamsOptionsDto,
  ) {
    return this.offersService.publish(id, queryParamOptionsDto);
  }

  @Post(':id/upload-file')
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
