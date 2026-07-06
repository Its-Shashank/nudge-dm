import { prisma } from "../config/db";
import { Prisma } from "@prisma/client";

export class SubscriptionRepository {
  async findByUserId(userId: string) {
    return prisma.subscription.findUnique({
      where: { userId },
    });
  }

  async findByStripeCustomerId(stripeCustomerId: string) {
    return prisma.subscription.findFirst({
      where: { stripeCustomerId },
    });
  }

  async create(data: Prisma.SubscriptionUncheckedCreateInput) {
    return prisma.subscription.create({
      data,
    });
  }

  async update(id: string, data: Prisma.SubscriptionUncheckedUpdateInput) {
    return prisma.subscription.update({
      where: { id },
      data,
    });
  }

  async upsert(userId: string, stripeCustomerId: string, plan = "FREE", status = "active") {
    return prisma.subscription.upsert({
      where: { userId },
      create: {
        userId,
        stripeCustomerId,
        plan,
        status,
      },
      update: {
        plan,
        status,
      },
    });
  }
}

export const subscriptionRepository = new SubscriptionRepository();
