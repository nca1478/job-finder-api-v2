import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

import { AppModule } from './app.module';
import { applyGlobalConfig } from './global-config';
import { EnvConfigService } from './common/env-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<EnvConfigService>(EnvConfigService);
  const logger = new Logger('Bootstrap');

  applyGlobalConfig(app);

  await app.listen(configService.getAppPort());

  logger.log(`App running on port ${configService.getAppPort()}`);
}

bootstrap();
