import { Module } from '@nestjs/common';
import { SectorsService } from './services/sectors.service';
import { SectorsController } from './controllers/sectors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectorEntity } from './entities/sector.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SectorEntity])],
  controllers: [SectorsController],
  providers: [SectorsService],
  exports: [SectorsService],
})
export class SectorsModule {}
