import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import { logger } from '../utils/logger';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof AppError) {
    logger.warn(err.message, { statusCode: err.statusCode });
    res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
    return;
  }

  logger.error('Unhandled error', {message: err.message, stack: err.stack});
  res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
};
