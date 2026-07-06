import { Request, Response, NextFunction } from "express";
import { billingService } from "../services/billing.service";
import { UnauthorizedError, BadRequestError } from "../utils/errors";

interface RawBodyRequest extends Request {
  rawBody?: Buffer;
}

export const checkout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const { plan } = req.body;

    if (!plan) {
      throw new BadRequestError("Plan parameter (STARTER or PRO) is required");
    }

    const sessionUrl = await billingService.createCheckoutSession(userId, plan);
    res.status(200).json({ url: sessionUrl });
    return;
  } catch (error) {
    next(error);
  }
};

export const getSubscription = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const details = await billingService.getSubscriptionDetails(userId);
    res.status(200).json(details);
    return;
  } catch (error) {
    next(error);
  }
};

export const handleWebhook = async (req: RawBodyRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const signature = req.headers["stripe-signature"] as string;

    if (!signature) {
      throw new UnauthorizedError("Stripe signature is missing from headers");
    }

    const rawBody = req.rawBody;
    if (!rawBody) {
      throw new BadRequestError("Raw body buffer not found, signature cannot be validated");
    }

    const success = await billingService.handleStripeWebhook(rawBody, signature);
    res.status(200).json({ received: true, processed: success });
    return;
  } catch (error) {
    next(error);
  }
};

export const sandboxCheckoutSuccess = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.query.userId as string;
    const plan = req.query.plan as string;

    if (!userId || !plan) {
      throw new BadRequestError("userId and plan parameters are required");
    }

    if (process.env.SANDBOX_MODE !== "true") {
      throw new BadRequestError("Sandbox endpoints are only available in SANDBOX_MODE=true");
    }

    await billingService.handleSandboxCheckoutCompleted(userId, plan);

    const redirectUrl = `${process.env.BETTER_AUTH_URL || "http://localhost:3000"}/dashboard?billing=success&plan=${plan}`;
    res.redirect(redirectUrl);
    return;
  } catch (error) {
    next(error);
  }
};
