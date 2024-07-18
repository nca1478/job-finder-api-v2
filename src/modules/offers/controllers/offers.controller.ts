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
import { OffersService } from '../services/offers.service';
import { CreateOfferDto, BodyOptionsDto, UpdateOfferDto } from '../dto';
import { OfferEntity } from '../entities/offer.entity';
import { PageDto, PageOptionsDto } from '../../../common/dtos';
import { GetUser } from '../../../common/decorators';
import { UserEntity } from '../../../modules/users/entities/user.entity';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

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
  @UseGuards(AuthGuard('jwt'))
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
  remove(@Param('id') id: string) {
    return this.offersService.remove(id);
  }
}
