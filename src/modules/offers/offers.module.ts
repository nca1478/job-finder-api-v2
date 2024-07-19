import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OffersService } from './services/offers.service';
import { OffersController } from './controllers/offers.controller';

import { OfferEntity } from './entities/offer.entity';
import { OfferSectorsEntity, OfferSkillsEntity } from './entities';

import { SkillsModule } from '../skills/skills.module';
import { SectorsModule } from '../sectors/sectors.module';
import { CloudinaryModule } from '../../common/modules/cloudinary/cloudinary.module';

@Module({
  imports: [
    CloudinaryModule,
    SectorsModule,
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
