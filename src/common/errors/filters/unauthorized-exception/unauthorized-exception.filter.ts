import { Response } from 'express';
import { HttpAdapterHost } from '@nestjs/core';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  UnauthorizedException,
} from '@nestjs/common';

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: UnauthorizedException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const { httpAdapter } = this.httpAdapterHost;

    response.status(status).json({
      success: false,
      statusCode: status,
      // path: httpAdapter.getRequestUrl(ctx.getRequest()),
      data: null,
      meta: null,
      errors: { msg: exception.message },
    });
  }
}
