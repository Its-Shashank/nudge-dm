import { Request, Response, NextFunction } from "express";
import { instagramService } from "../services/instagram.service";
import { automationService } from "../services/automation.service";
import { isDbConnected } from "../config/db";
import { auth } from "../lib/auth";
import { UnauthorizedError, BadRequestError } from "../utils/errors";
import { logger } from "../utils/logger";
import crypto from "crypto";

interface RawBodyRequest extends Request {
  rawBody?: Buffer;
}

export const connectInstagram = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const url = instagramService.getConnectUrl();
    res.status(200).json({ url });
    return;
  } catch (error) {
    next(error);
  }
};

export const instagramCallback = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const code = req.query.code as string;

    let userId = "mock-user-123";

    if (isDbConnected) {
      const sessionRes = await auth.api.getSession({ headers: req.headers });
      if (sessionRes?.user?.id) {
        userId = sessionRes.user.id;
      }
    } else {
      const token =
        req.cookies?.["better-auth.session_token"] ||
        req.headers.authorization?.split(" ")[1];
      if (token === "mock-session-token-123") {
        userId = "mock-user-123";
      }
    }

    if (!code) {
      throw new BadRequestError("Auth code is missing from Instagram redirect callback");
    }

    await instagramService.handleOAuthCallback(code, userId);

    const redirectUrl = `${process.env.BETTER_AUTH_URL || "http://localhost:3000"}/dashboard?instagram=connected`;
    res.redirect(redirectUrl);
    return;
  } catch (error) {
    next(error);
  }
};

export const getConnectedAccount = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const account = await instagramService.getConnectedAccount(userId);
    res.status(200).json(account);
    return;
  } catch (error) {
    next(error);
  }
};

export const disconnectInstagram = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    await instagramService.disconnectInstagram(userId);
    res.status(200).json({ success: true, message: "Instagram account disconnected" });
    return;
  } catch (error) {
    next(error);
  }
};

export const verifyWebhook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    const verifyToken = process.env.FB_APP_SECRET || "mock_fb_app_secret";

    if (mode === "subscribe" && token === verifyToken) {
      logger.info("Instagram Webhook verified successfully");
      res.status(200).send(challenge);
      return;
    } else {
      logger.warn(`Instagram Webhook verification failed. Token mismatch. Expected: ${verifyToken}, Received: ${token}`);
      res.status(403).send("Forbidden");
      return;
    }
  } catch (error) {
    next(error);
  }
};

export const handleWebhookEvent = async (req: RawBodyRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const isSandbox = process.env.SANDBOX_MODE === "true";
    if (!isSandbox) {
      const signature = req.headers["x-hub-signature-256"] as string;
      const appSecret = process.env.FB_APP_SECRET;

      if (!signature) {
        throw new UnauthorizedError("Meta webhook signature is missing");
      }

      if (!appSecret) {
        throw new BadRequestError("App configuration error: FB_APP_SECRET is not set");
      }

      const parts = signature.split("=");
      const signatureHash = parts[1];
      const rawBody = req.rawBody;

      if (!rawBody) {
        throw new BadRequestError("Raw body buffer not found, signature cannot be validated");
      }

      const expectedHash = crypto
        .createHmac("sha256", appSecret)
        .update(rawBody)
        .digest("hex");

      if (signatureHash !== expectedHash) {
        logger.warn(`Signature mismatch. Expected: ${expectedHash}, Received: ${signatureHash}`);
        throw new UnauthorizedError("Meta webhook signature mismatch");
      }
    }

    const payload = req.body;
    logger.info("Meta Webhook verified. Processing payload...");
    const stats = await automationService.processCommentWebhook(payload);

    res.status(200).json({
      success: true,
      message: "Webhook processed",
      ...stats,
    });
    return;
  } catch (error) {
    next(error);
  }
};
