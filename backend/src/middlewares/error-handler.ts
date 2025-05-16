import { CelebrateError } from 'celebrate';
import { Request, Response, NextFunction } from 'express';
import NotFoundError from '../errors/not-found-error';
import BadRequestError from '../errors/bad-request-error';
import ConflictError from '../errors/conflict-error';

const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  let statusCode = 500;
  let message = 'Internal Server Error';

  if (err instanceof BadRequestError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof NotFoundError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof ConflictError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof CelebrateError) {
    statusCode = 400;
    message = 'Ошибка валидации данных';
  } else if (err instanceof Error && err.message.includes('E11000')) {
    statusCode = 409;
    message = 'Товар с таким названием уже существует';
  }

  res.status(statusCode).json({
    message,
  });
};

export default errorHandler;
