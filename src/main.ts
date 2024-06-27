import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DatabaseInterceptor } from './common/errors/interceptors/database.interceptor';
import { ResponseInterceptor } from './common/interceptors/response/response.interceptor';
import { UnauthorizedExceptionFilter } from './common/errors/filters/unauthorized-exception/unauthorized-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const adapterHost = app.get(HttpAdapterHost);

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

  await app.listen(3000);
}
bootstrap();
