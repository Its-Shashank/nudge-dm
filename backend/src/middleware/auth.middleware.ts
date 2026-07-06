import { Request, Response, NextFunction } from "express";
import { auth } from "../lib/auth";
import { isDbConnected } from "../config/db";
import { UnauthorizedError } from "../utils/errors";
import { subscriptionRepository } from "../repositories/subscription.repository";

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token =
      req.cookies?.["better-auth.session_token"] ||
      req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new UnauthorizedError("Authentication token is missing");
    }

    if (!isDbConnected) {
      // Sandbox validation fallback
      if (token === "mock-session-token-123") {
        (req as any).user = {
          id: "mock-user-123",
          name: "Mock User",
          email: "test@nudgedm.com",
          createdAt: new Date(),
          subscription: {
            plan: "FREE",
            status: "active",
          },
        };
        return next();
      }
      throw new UnauthorizedError("Invalid session token in sandbox mode");
    }

    // Call Better Auth to parse session
    const sessionRes = await auth.api.getSession({
      headers: req.headers,
    });

    if (!sessionRes || !sessionRes.session || !sessionRes.user) {
      throw new UnauthorizedError("Invalid or expired session");
    }

    // Fetch user's subscription limits
    const sub = await subscriptionRepository.findByUserId(sessionRes.user.id);

    (req as any).user = {
      id: sessionRes.user.id,
      name: sessionRes.user.name,
      email: sessionRes.user.email,
      createdAt: sessionRes.user.createdAt,
      subscription: sub
        ? {
            plan: sub.plan,
            status: sub.status,
          }
        : {
            plan: "FREE",
            status: "active",
          },
    };

    next();
  } catch (error) {
    next(error);
  }
};
