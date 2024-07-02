import * as passport from 'passport';
import * as session from 'express-session';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { DatabaseInterceptor } from './common/errors/interceptors/database.interceptor';
import { ResponseInterceptor } from './common/interceptors/response/response.interceptor';
import { UnauthorizedExceptionFilter } from './common/errors/filters/unauthorized-exception/unauthorized-exception.filter';
import { EnvConfigService } from './common/env-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const adapterHost = app.get(HttpAdapterHost);
  const configService = app.get<EnvConfigService>(EnvConfigService);

  app.setGlobalPrefix('api/v2');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new UnauthorizedExceptionFilter(adapterHost));
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalInterceptors(new DatabaseInterceptor());

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

  await app.listen(3000);
}
bootstrap();
