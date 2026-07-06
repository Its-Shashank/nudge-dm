import { Request, Response, NextFunction } from "express";
import { RateLimiterMemory } from "rate-limiter-flexible";
import { TooManyRequestsError } from "../utils/errors";

// Limit authentication endpoints to 10 requests per minute
const authLimiter = new RateLimiterMemory({
  points: 10,
  duration: 60,
});

// Limit webhook endpoints to 100 requests per minute
const webhookLimiter = new RateLimiterMemory({
  points: 100,
  duration: 60,
});

export const rateLimitAuth = (req: Request, _res: Response, next: NextFunction) => {
  const ip = req.ip || "127.0.0.1";
  authLimiter
    .consume(ip)
    .then(() => next())
    .catch(() => {
      next(new TooManyRequestsError("Too many auth attempts. Please try again after 60 seconds."));
    });
};

export const rateLimitWebhook = (req: Request, _res: Response, next: NextFunction) => {
  const ip = req.ip || "127.0.0.1";
  webhookLimiter
    .consume(ip)
    .then(() => next())
    .catch(() => {
      next(new TooManyRequestsError("Rate limit exceeded for webhooks."));
    });
};
