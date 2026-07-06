import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors";
import { logger } from "../utils/logger";
import { ZodError } from "zod";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  // 1. Check for Zod schema validation errors
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      error: "Validation error",
      details: err.errors.map((e) => ({
        path: e.path.join("."),
        message: e.message,
      })),
    });
  }

  // 2. Check for customized AppError (Unauthorized, NotFound, BadRequest, etc.)
  if (err instanceof AppError) {
    logger.warn(`AppError [${err.statusCode}]: ${err.message}`);
    return res.status(err.statusCode).json({
      success: false,
      error: err.message,
    });
  }

  // 3. Fallback unhandled server error
  logger.error("Unhandled System Error:", err);
  return res.status(500).json({
    success: false,
    error: process.env.NODE_ENV === "production" ? "Internal server error" : err.message,
  });
};
