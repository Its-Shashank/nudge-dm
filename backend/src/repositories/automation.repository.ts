import { prisma } from "../config/db";
import { Prisma } from "@prisma/client";

export class AutomationRepository {
  async findAllByUserId(userId: string) {
    return prisma.automation.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }

  async findByIdAndUserId(id: string, userId: string) {
    return prisma.automation.findFirst({
      where: { id, userId },
    });
  }

  async findActiveByUserId(userId: string) {
    return prisma.automation.findMany({
      where: { userId, enabled: true },
    });
  }

  async create(data: Prisma.AutomationUncheckedCreateInput) {
    // Normalise keywords to lowercase
    if (data.keywords) {
      data.keywords = data.keywords
        .split(",")
        .map((k) => k.trim().toLowerCase())
        .filter(Boolean)
        .join(",");
    }
    return prisma.automation.create({
      data,
    });
  }

  async update(id: string, userId: string, data: Prisma.AutomationUncheckedUpdateInput) {
    if (typeof data.keywords === "string") {
      data.keywords = data.keywords
        .split(",")
        .map((k) => k.trim().toLowerCase())
        .filter(Boolean)
        .join(",");
    }
    return prisma.automation.update({
      where: { id, userId },
      data,
    });
  }

  async delete(id: string, userId: string) {
    return prisma.automation.delete({
      where: { id, userId },
    });
  }
}

export const automationRepository = new AutomationRepository();
