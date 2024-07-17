import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OffersService } from './services/offers.service';
import { OffersController } from './controllers/offers.controller';

import { OfferEntity } from './entities/offer.entity';
import { OfferSectorsEntity, OfferSkillsEntity } from './entities';
import { SkillsModule } from '../skills/skills.module';

@Module({
  imports: [
    SkillsModule,
    TypeOrmModule.forFeature([
      OfferEntity,
      OfferSkillsEntity,
      OfferSectorsEntity,
    ]),
  ],
  controllers: [OffersController],
  providers: [OffersService],
})
export class OffersModule {}
