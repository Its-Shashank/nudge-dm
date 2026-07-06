import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/db";
import { automationRepository } from "../repositories/automation.repository";
import { instagramRepository } from "../repositories/instagram.repository";
import { subscriptionRepository } from "../repositories/subscription.repository";
import { messageLogRepository } from "../repositories/message-log.repository";

export const getDashboardStats = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const automations = await automationRepository.findAllByUserId(userId);
    const totalAutomations = automations.length;
    const activeAutomations = automations.filter((a) => a.enabled).length;

    const messagesSent = await messageLogRepository.countMonthlyDMs(userId);

    const messagesFailed = await prisma.messageLog.count({
      where: {
        status: "FAILED",
        createdAt: {
          gte: startOfMonth,
        },
        automation: {
          userId,
        },
      },
    });

    const igAccount = await instagramRepository.findByUserId(userId);
    const connectedAccount = igAccount
      ? {
          username: igAccount.username,
          instagramId: igAccount.instagramId,
          connectedAt: igAccount.connectedAt,
        }
      : null;

    const sub = await subscriptionRepository.findByUserId(userId);
    const currentPlan = {
      plan: sub?.plan || "FREE",
      status: sub?.status || "active",
    };

    const recentActivity = await messageLogRepository.findAllByUserId(userId, 10);

    res.status(200).json({
      totalAutomations,
      activeAutomations,
      messagesSent,
      messagesFailed,
      connectedAccount,
      currentPlan,
      recentActivity,
    });
    return;
  } catch (error) {
    next(error);
  }
};
