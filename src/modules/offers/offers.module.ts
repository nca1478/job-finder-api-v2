import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OffersService } from './services/offers.service';
import { OffersController } from './controllers/offers.controller';
import { OfferEntity } from './entities/offer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OfferEntity])],
  controllers: [OffersController],
  providers: [OffersService],
})
export class OffersModule {}
