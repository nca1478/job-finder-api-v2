import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { catchError, Observable } from 'rxjs';
import { dbErrorCodes } from '../enums/db-error-codes.enum';

@Injectable()
export class DatabaseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof QueryFailedError) {
          const errorCode = error.driverError.code;

          switch (errorCode) {
            case dbErrorCodes.UniqueConstraint:
              throw new BadRequestException(error.driverError.detail);

            default:
              throw new InternalServerErrorException(error.message);
          }
        } else {
          throw error;
        }
      }),
    );
  }
}
