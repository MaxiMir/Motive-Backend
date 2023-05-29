import { Response } from 'express';
import { Catch, ExceptionFilter, ArgumentsHost, HttpStatus, HttpException, Logger } from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  public catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const logger = new Logger('error');

    if (exception instanceof EntityNotFoundError) {
      return response.status(404).json({
        message: {
          statusCode: 404,
          error: 'Not Found',
        },
      });
    }

    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const error = exception instanceof HttpException ? exception.getResponse() : 'Internal Server Error';

    if (process.env.NODE_ENV === 'production') {
      logger.error(exception);
    }

    return response.status(status).json({
      message: {
        statusCode: status,
        error,
      },
    });
  }
}
