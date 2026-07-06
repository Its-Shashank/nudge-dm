import { Request, Response, NextFunction } from "express";
import { auth } from "../lib/auth";
import { registerSchema, loginSchema } from "../validators/auth.validator";
import { isDbConnected } from "../config/db";
import { BadRequestError, UnauthorizedError } from "../utils/errors";
import { logger } from "../utils/logger";
import { subscriptionRepository } from "../repositories/subscription.repository";
import { setSessionCookie, clearSessionCookie } from "../utils/session-cookie";

// Sandbox mock token bypasses Better Auth signing
const setMockSessionCookie = (res: Response, token: string) => {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  res.cookie("better-auth.session_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
  });
};

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const validated = registerSchema.parse(req.body);
    const { email, password, name } = validated;

    if (!isDbConnected) {
      // Sandbox mode registration
      logger.info(`[Sandbox Mode] Registering user ${name} (${email})`);
      const mockUser = {
        id: "mock-user-123",
        name,
        email,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      setMockSessionCookie(res, "mock-session-token-123");
      res.status(201).json({
        user: mockUser,
        session: { token: "mock-session-token-123" },
      });
      return;
    }

    // Regular Better Auth
    try {
      const result = await auth.api.signUpEmail({
        body: { email, password, name },
        headers: req.headers,
      });

      if (!result || !result.token) {
        throw new Error("Registration succeeded but no token was returned");
      }

      // Initialize free subscription for new user
      await subscriptionRepository.upsert(result.user.id, `cus_mock_${result.user.id}`, "FREE", "active");

      await setSessionCookie(res, result.token);
      res.status(201).json({
        user: {
          id: result.user.id,
          name: result.user.name,
          email: result.user.email,
          createdAt: result.user.createdAt,
        },
        session: {
          token: result.token,
        },
      });
      return;
    } catch (err: any) {
      logger.error("Better Auth registration error", err);
      throw new BadRequestError(err.message || "Failed to register user");
    }
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const validated = loginSchema.parse(req.body);
    const { email, password } = validated;

    if (!isDbConnected) {
      // Sandbox mode login
      logger.info(`[Sandbox Mode] Logging in user ${email}`);
      const mockUser = {
        id: "mock-user-123",
        name: "Mock User",
        email,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setMockSessionCookie(res, "mock-session-token-123");
      res.status(200).json({
        user: mockUser,
        session: { token: "mock-session-token-123" },
      });
      return;
    }

    try {
      const result = await auth.api.signInEmail({
        body: { email, password },
        headers: req.headers,
      });

      if (!result || !result.token) {
        throw new Error("Login failed to return session token");
      }

      await setSessionCookie(res, result.token);
      res.status(200).json({
        user: {
          id: result.user.id,
          name: result.user.name,
          email: result.user.email,
          createdAt: result.user.createdAt,
        },
        session: {
          token: result.token,
        },
      });
      return;
    } catch (err: any) {
      logger.error("Better Auth login error", err);
      throw new UnauthorizedError("Invalid email or password");
    }
  } catch (error) {
    next(error);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    clearSessionCookie(res);

    if (!isDbConnected) {
      logger.info("[Sandbox Mode] Logged out user");
      res.status(200).json({ success: true, message: "Logged out successfully" });
      return;
    }

    try {
      await auth.api.signOut({
        headers: req.headers,
      });
      res.status(200).json({ success: true, message: "Logged out successfully" });
      return;
    } catch (err) {
      logger.warn("Better Auth sign out failed or token already invalid", err);
      res.status(200).json({ success: true, message: "Logged out successfully" });
      return;
    }
  } catch (error) {
    next(error);
  }
};

export const me = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = (req as any).user;
    if (!user) {
      throw new UnauthorizedError("Not authenticated");
    }

    res.status(200).json({
      user,
    });
    return;
  } catch (error) {
    next(error);
  }
};
