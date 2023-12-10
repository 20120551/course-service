import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { AxiosError } from 'axios';
import { Response } from 'express';
import { Prisma } from 'utils/prisma/client';

@Catch(Error)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof AxiosError) {
      const status = exception.response.status;
      return response.status(status).json({
        statusCode: status,
        message:
          exception.response.data.error_description ||
          exception.response.data.error ||
          exception.response.data.description ||
          'Internal server error',
        error:
          exception.response.data.error ||
          exception.response.data.code ||
          exception.message,
      });
    } else if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const res = exception.getResponse();
      return response.status(status).json({
        message: typeof res === 'string' ? res : res['message'],
        error: exception.message,
      });
    } else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(exception);
      if (exception.code === 'P2002') {
        // Example: Unique constraint violation
        response.status(400).json({
          statusCode: '400',
          message: 'Bad Request',
          error: exception.meta?.cause || 'Duplicate entry found',
        });
      } else if (exception.code === 'P2016') {
        // Example: Record not found
        response.status(404).json({
          statusCode: '404',
          message: 'Not Found',
          error: exception.meta?.cause || 'Record not found',
        });
      } else if (exception.code === 'P2003') {
        // Example: Foreign key constraint violation
        response.status(400).json({
          statusCode: '400',
          message: 'Bad Request',
          error: exception.meta?.cause || 'Foreign key constraint violation',
        });
      } else if (exception.code === 'P2025') {
        // Example: Invalid data input
        response.status(400).json({
          statusCode: '400',
          message: 'Unprocessable Entity',
          error: exception.meta?.cause || 'Invalid data input',
        });
      } else {
        // Handle other Prisma ORM errors or unknown errors
        response.status(500).json({
          statusCode: '500',
          message: 'Internal Server Error',
          error: exception.meta?.cause || 'An unexpected error occurred',
        });
      }
    } else {
      return response.status(500).json({
        statusCode: 500,
        error: exception.message,
        message: 'Internal server error',
      });
    }
  }
}
