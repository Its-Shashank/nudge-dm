import { automationRepository } from "../repositories/automation.repository";
import { messageLogRepository } from "../repositories/message-log.repository";
import { instagramRepository } from "../repositories/instagram.repository";
import { subscriptionRepository } from "../repositories/subscription.repository";
import { instagramService } from "./instagram.service";
import { emailService } from "./email.service";
import { BadRequestError, NotFoundError } from "../utils/errors";
import { logger } from "../utils/logger";

const PLAN_LIMITS: Record<string, number> = {
  FREE: 100,
  STARTER: 5000,
  PRO: Number.MAX_SAFE_INTEGER,
};

export class AutomationService {
  async getAutomations(userId: string) {
    return automationRepository.findAllByUserId(userId);
  }

  async getAutomation(id: string, userId: string) {
    const automation = await automationRepository.findByIdAndUserId(id, userId);
    if (!automation) {
      throw new NotFoundError("Automation not found or access denied");
    }
    return automation;
  }

  async createAutomation(userId: string, plan: string, data: any) {
    // Limit check: FREE plan can only have 1 automation
    if (plan === "FREE") {
      const existing = await automationRepository.findAllByUserId(userId);
      if (existing.length >= 1) {
        throw new BadRequestError(
          "Free plan is limited to 1 automation. Please upgrade your plan to create more."
        );
      }
    }

    return automationRepository.create({
      ...data,
      userId,
    });
  }

  async updateAutomation(id: string, userId: string, data: any) {
    await this.getAutomation(id, userId);
    return automationRepository.update(id, userId, data);
  }

  async deleteAutomation(id: string, userId: string) {
    await this.getAutomation(id, userId);
    return automationRepository.delete(id, userId);
  }

  /**
   * Processes an incoming Instagram comment webhook event
   */
  async processCommentWebhook(payload: any): Promise<{ processed: number; skipped: number }> {
    let processedCount = 0;
    let skippedCount = 0;

    if (!payload.entry || !Array.isArray(payload.entry)) {
      return { processed: 0, skipped: 0 };
    }

    for (const entry of payload.entry) {
      const instagramId = entry.id; // Receiver Instagram Account ID
      if (!entry.changes || !Array.isArray(entry.changes)) continue;

      // 1. Identify the Instagram Account in our system
      const igAccount = await instagramRepository.findByInstagramId(instagramId);
      if (!igAccount) {
        logger.warn(`Received webhook comment for unlinked Instagram Account ID: ${instagramId}`);
        skippedCount += entry.changes.length;
        continue;
      }

      const userId = igAccount.userId;

      // 2. Fetch Subscription limits
      const sub = await subscriptionRepository.findByUserId(userId);
      const plan = sub?.plan || "FREE";
      const limit = PLAN_LIMITS[plan] || PLAN_LIMITS.FREE;

      for (const change of entry.changes) {
        if (change.field !== "comments" || !change.value) {
          skippedCount++;
          continue;
        }

        const commentVal = change.value;
        const commentId = commentVal.id;
        const commentText = commentVal.text || "";
        const commenterIgId = commentVal.from?.id;

        if (!commenterIgId) {
          logger.warn(`Skipping comment ${commentId} with no sender details`);
          skippedCount++;
          continue;
        }

        logger.info(`Processing comment webhook event: "${commentText}" from user: ${commenterIgId}`);

        // 3. Retrieve all active automations for the user
        const automations = await automationRepository.findActiveByUserId(userId);
        let matchedAutomation = null;

        for (const auto of automations) {
          const keywords = auto.keywords.split(",").map((k) => k.trim().toLowerCase());
          
          // Match logic:
          // Check if any keyword matches (case-insensitive substring match)
          const isMatched = keywords.some((kw) => {
            if (kw === "*" || kw === "any") return true;
            return commentText.toLowerCase().includes(kw);
          });

          if (isMatched) {
            matchedAutomation = auto;
            break; // trigger the first matched automation
          }
        }

        if (!matchedAutomation) {
          logger.info(`No active automations matched comment "${commentText}"`);
          skippedCount++;
          continue;
        }

        // 4. Verify monthly DM usage limits
        const monthlySent = await messageLogRepository.countMonthlyDMs(userId);
        if (monthlySent >= limit) {
          logger.warn(`Monthly DM usage limit reached for User: ${userId} (${monthlySent}/${limit})`);
          
          // Log failure
          await messageLogRepository.create({
            automationId: matchedAutomation.id,
            instagramUserId: commenterIgId,
            comment: commentText,
            message: matchedAutomation.message,
            status: "FAILED",
            error: `Monthly DM limits reached for your ${plan} plan.`,
          });

          // Trigger notification email (non-blocking)
          emailService.sendUsageLimitReachedEmail(userId, plan).catch((err) => {
            logger.error("Failed to send usage limit email", err);
          });

          skippedCount++;
          continue;
        }

        // 5. Execute action (with delay if configured)
        processedCount++;
        const executeSend = async () => {
          try {
            const sendResult = await instagramService.sendDirectMessage(
              igAccount.instagramId,
              commenterIgId,
              matchedAutomation!.message,
              igAccount.accessToken
            );

            if (sendResult.success) {
              await messageLogRepository.create({
                automationId: matchedAutomation!.id,
                instagramUserId: commenterIgId,
                comment: commentText,
                message: matchedAutomation!.message,
                status: "SENT",
              });
              logger.info(`Successfully sent DM response for comment ${commentId}`);
            } else {
              await messageLogRepository.create({
                automationId: matchedAutomation!.id,
                instagramUserId: commenterIgId,
                comment: commentText,
                message: matchedAutomation!.message,
                status: "FAILED",
                error: sendResult.error || "Unknown Instagram Send Error",
              });
              logger.error(`Failed to send DM: ${sendResult.error}`);
            }
          } catch (sendErr: any) {
            await messageLogRepository.create({
              automationId: matchedAutomation!.id,
              instagramUserId: commenterIgId,
              comment: commentText,
              message: matchedAutomation!.message,
              status: "FAILED",
              error: sendErr.message || "Failed during execution callback",
            });
            logger.error(`Error executing send callback: ${sendErr.message}`);
          }
        };

        if (matchedAutomation.delay > 0) {
          logger.info(`Delaying DM response by ${matchedAutomation.delay} seconds`);
          setTimeout(executeSend, matchedAutomation.delay * 1000);
        } else {
          executeSend();
        }
      }
    }

    return { processed: processedCount, skipped: skippedCount };
  }
}

export const automationService = new AutomationService();
