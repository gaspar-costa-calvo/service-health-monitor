import { Request, Response, NextFunction } from "express";
import { ZodError, ZodType } from "zod";
import { AppError } from "../utils/AppError";

export const validateRequest =
  (schema: ZodType) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const message = error.issues[0]?.message ?? "Invalid request body";
        next(new AppError(message, 400));
        return;
      }
      next(error);
    }
  };