import * as passport from 'passport';
import * as session from 'express-session';
import { INestApplication, ValidationPipe } from '@nestjs/common';

import { EnvConfigService } from './common/env-config';

import { AllExceptionsFilter } from './common/errors/filters';

import { ResponseInterceptor } from './common/interceptors/response/response.interceptor';
import { DatabaseInterceptor } from './common/errors/interceptors';

export function applyGlobalConfig(app: INestApplication) {
  // const adapterHost = app.get(HttpAdapterHost);
  const configService = app.get<EnvConfigService>(EnvConfigService);

  app.enableCors();

  app.setGlobalPrefix('api/v2');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter());

  app.useGlobalInterceptors(
    new ResponseInterceptor(),
    // new DatabaseInterceptor(),
  );

  app.use(
    session({
      secret: configService.getApiSessionKey(),
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 60000,
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
}
