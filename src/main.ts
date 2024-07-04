import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { applyGlobalConfig } from './global-config';
import { EnvConfigService } from './common/env-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<EnvConfigService>(EnvConfigService);

  applyGlobalConfig(app);

  await app.listen(configService.getAppPort());
}

bootstrap();
