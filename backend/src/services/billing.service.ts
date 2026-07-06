import Stripe from "stripe";
import { subscriptionRepository } from "../repositories/subscription.repository";
import { userRepository } from "../repositories/user.repository";
import { messageLogRepository } from "../repositories/message-log.repository";
import { emailService } from "./email.service";
import { logger } from "../utils/logger";
import { BadRequestError, NotFoundError } from "../utils/errors";

export class BillingService {
  private stripe: Stripe | null = null;

  constructor() {
    const key = process.env.STRIPE_SECRET_KEY;
    if (key && key !== "sk_test_mock") {
      this.stripe = new Stripe(key, {
        apiVersion: "2023-10-16" as any,
      });
    } else {
      logger.info("Stripe Secret Key is missing or using mock key. Running billing in sandbox mode.");
    }
  }

  private isSandbox(): boolean {
    return !this.stripe || process.env.SANDBOX_MODE === "true";
  }

  async createCheckoutSession(userId: string, plan: string): Promise<string> {
    const uppercasePlan = plan.toUpperCase();
    if (uppercasePlan !== "STARTER" && uppercasePlan !== "PRO") {
      throw new BadRequestError("Invalid plan. Choose STARTER or PRO");
    }

    if (this.isSandbox()) {
      logger.info(`[Sandbox Mode] Creating mock checkout session for User ${userId} subscribing to ${uppercasePlan}`);
      // Return a callback URL that redirects to dashboard with simulation params
      return `${process.env.BETTER_AUTH_URL || "http://localhost:5001"}/billing/sandbox-checkout-success?userId=${userId}&plan=${uppercasePlan}`;
    }

    try {
      const user = await userRepository.findById(userId);
      if (!user) throw new NotFoundError("User not found");

      let sub = await subscriptionRepository.findByUserId(userId);
      let customerId = sub?.stripeCustomerId;

      // 1. Ensure user has a Stripe Customer profile
      if (!customerId) {
        const customer = await this.stripe!.customers.create({
          email: user.email,
          name: user.name,
          metadata: { userId },
        });
        customerId = customer.id;
        // Upsert subscription base with customerId
        sub = await subscriptionRepository.upsert(userId, customerId, "FREE", "active");
      }

      // 2. Select appropriate price ID
      const priceId =
        uppercasePlan === "STARTER"
          ? process.env.STRIPE_STARTER_PRICE_ID
          : process.env.STRIPE_PRO_PRICE_ID;

      if (!priceId) {
        throw new Error(`Stripe Price ID for ${uppercasePlan} plan is not configured in env variables`);
      }

      // 3. Create Stripe Checkout Session
      const session = await this.stripe!.checkout.sessions.create({
        customer: customerId,
        payment_method_types: ["card"],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: "subscription",
        success_url: `${process.env.BETTER_AUTH_URL || "http://localhost:3000"}/dashboard?billing=success`,
        cancel_url: `${process.env.BETTER_AUTH_URL || "http://localhost:3000"}/dashboard/billing?billing=cancelled`,
        metadata: {
          userId,
          plan: uppercasePlan,
        },
      });

      if (!session.url) throw new Error("Stripe did not generate a session URL");
      return session.url;
    } catch (err: any) {
      logger.error("Failed to create Stripe checkout session", err);
      throw new BadRequestError(`Stripe checkout failed: ${err.message}`);
    }
  }

  async getSubscriptionDetails(userId: string) {
    const sub = await subscriptionRepository.findByUserId(userId);
    const plan = sub?.plan || "FREE";
    const status = sub?.status || "active";

    // Fetch monthly usage
    const usageCount = await messageLogRepository.countMonthlyDMs(userId);
    
    // Limits definition
    const limits: Record<string, number> = {
      FREE: 100,
      STARTER: 5000,
      PRO: 9999999, // practically unlimited
    };

    return {
      plan,
      status,
      customerId: sub?.stripeCustomerId || null,
      subscriptionId: sub?.stripeSubscriptionId || null,
      usage: usageCount,
      limit: limits[plan] || 100,
    };
  }

  /**
   * Processes incoming Stripe Webhooks
   */
  async handleStripeWebhook(rawBody: Buffer, signature: string): Promise<boolean> {
    if (this.isSandbox()) {
      logger.info("[Sandbox Mode] Ignoring real Stripe webhook signature parsing");
      return false;
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      throw new Error("Stripe webhook verification error: STRIPE_WEBHOOK_SECRET is not configured");
    }

    let event: Stripe.Event;

    try {
      event = this.stripe!.webhooks.constructEvent(rawBody, signature, webhookSecret);
    } catch (err: any) {
      logger.warn(`Stripe webhook signature verification failed: ${err.message}`);
      throw new BadRequestError(`Webhook Error: ${err.message}`);
    }

    logger.info(`Received Stripe Webhook event: ${event.type}`);

    try {
      switch (event.type) {
        case "checkout.session.completed": {
          const session = event.data.object as Stripe.Checkout.Session;
          const userId = session.metadata?.userId;
          const plan = session.metadata?.plan || "FREE";
          const customerId = session.customer as string;
          const subscriptionId = session.subscription as string;

          if (userId) {
            await subscriptionRepository.upsert(userId, customerId, plan, "active");
            // Set subscription ID
            const subRecord = await subscriptionRepository.findByUserId(userId);
            if (subRecord) {
              await subscriptionRepository.update(subRecord.id, {
                stripeSubscriptionId: subscriptionId,
              });
            }

            emailService.sendSubscriptionConfirmation(userId, plan).catch((err) => {
              logger.error("Failed to send subscription email", err);
            });
          }
          break;
        }

        case "customer.subscription.updated": {
          const subscription = event.data.object as Stripe.Subscription;
          const customerId = subscription.customer as string;
          const status = subscription.status;

          // Find associated user subscription record
          const subRecord = await subscriptionRepository.findByStripeCustomerId(customerId);
          if (subRecord) {
            // Map Stripe price ID back to plan name if possible
            const priceId = subscription.items.data[0]?.price.id;
            let plan = subRecord.plan;
            if (priceId === process.env.STRIPE_STARTER_PRICE_ID) plan = "STARTER";
            else if (priceId === process.env.STRIPE_PRO_PRICE_ID) plan = "PRO";

            await subscriptionRepository.update(subRecord.id, {
              status: status === "active" ? "active" : status,
              plan,
            });
          }
          break;
        }

        case "customer.subscription.deleted": {
          const subscription = event.data.object as Stripe.Subscription;
          const customerId = subscription.customer as string;

          const subRecord = await subscriptionRepository.findByStripeCustomerId(customerId);
          if (subRecord) {
            // Downgrade to free
            await subscriptionRepository.update(subRecord.id, {
              plan: "FREE",
              status: "canceled",
              stripeSubscriptionId: null,
            });
            logger.info(`Stripe Subscription cancelled for customer ${customerId}. Downgrading to FREE.`);
          }
          break;
        }

        case "invoice.payment_succeeded": {
          const invoice = event.data.object as Stripe.Invoice;
          const customerId = invoice.customer as string;
          const amount = invoice.amount_paid;

          const subRecord = await subscriptionRepository.findByStripeCustomerId(customerId);
          if (subRecord) {
            emailService.sendPaymentSuccessEmail(subRecord.userId, amount).catch((err) => {
              logger.error("Failed to send payment success email", err);
            });
          }
          break;
        }

        case "invoice.payment_failed": {
          const invoice = event.data.object as Stripe.Invoice;
          const customerId = invoice.customer as string;

          const subRecord = await subscriptionRepository.findByStripeCustomerId(customerId);
          if (subRecord) {
            emailService.sendPaymentFailedEmail(subRecord.userId).catch((err) => {
              logger.error("Failed to send billing alert email", err);
            });
          }
          break;
        }
      }
      return true;
    } catch (err: any) {
      logger.error(`Error processing Stripe Webhook event ${event.type}:`, err);
      return false;
    }
  }

  /**
   * Sandbox only simulation callback logic
   */
  async handleSandboxCheckoutCompleted(userId: string, plan: string) {
    if (!this.isSandbox()) return;

    logger.info(`[Sandbox Mode] Processing simulated checkout completion for User ${userId} -> Plan ${plan}`);
    
    // Upsert subscription
    await subscriptionRepository.upsert(userId, `cus_sandbox_${userId}`, plan, "active");
    const subRecord = await subscriptionRepository.findByUserId(userId);
    if (subRecord) {
      await subscriptionRepository.update(subRecord.id, {
        stripeSubscriptionId: `sub_sandbox_${userId}`,
      });
    }

    // Trigger mock notification
    emailService.sendSubscriptionConfirmation(userId, plan).catch((err) => {
      logger.error("Failed to send subscription confirmation mock email", err);
    });
  }
}

export const billingService = new BillingService();
