import { Module } from '@nestjs/common';
import { EnvConfigModule } from '../../common/env-config';
import { FilesService } from './services/files.service';

@Module({
  imports: [EnvConfigModule],
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule {}
