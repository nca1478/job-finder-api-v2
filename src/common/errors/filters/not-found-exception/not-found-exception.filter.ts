import {
  Catch,
  ExceptionFilter,
  NotFoundException,
  ArgumentsHost,
} from '@nestjs/common';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const status = exception.getStatus();

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
