import { Module } from '@nestjs/common';
import { EnvConfigModule } from './common/env-config/env-config.module';

@Module({
  imports: [EnvConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
