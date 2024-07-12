import { Module } from '@nestjs/common';
import { SectorsService } from './services/sectors.service';
import { SectorsController } from './controllers/sectors.controller';

@Module({
  controllers: [SectorsController],
  providers: [SectorsService],
})
export class SectorsModule {}
