import { prisma } from "../config/db";
import { Prisma } from "@prisma/client";

export class MessageLogRepository {
  async create(data: Prisma.MessageLogUncheckedCreateInput) {
    return prisma.messageLog.create({
      data,
    });
  }

  async countMonthlyDMs(userId: string): Promise<number> {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    return prisma.messageLog.count({
      where: {
        status: "SENT",
        createdAt: {
          gte: startOfMonth,
        },
        automation: {
          userId,
        },
      },
    });
  }

  async countByStatus(userId: string, status: string): Promise<number> {
    return prisma.messageLog.count({
      where: {
        status,
        automation: {
          userId,
        },
      },
    });
  }

  async findAllByUserId(userId: string, limit = 10) {
    return prisma.messageLog.findMany({
      where: {
        automation: {
          userId,
        },
      },
      include: {
        automation: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
    });
  }
}

export const messageLogRepository = new MessageLogRepository();
