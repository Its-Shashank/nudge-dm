import dotenv from "dotenv";
dotenv.config();

import { prisma } from "../config/db";
import { auth } from "../lib/auth";
import { encrypt } from "../utils/encryption";
import { logger } from "../utils/logger";

const DEMO_USERS = [
  {
    email: "demo-free@nudgedm.com",
    password: "password123",
    name: "Demo Free User",
    plan: "FREE" as const,
    instagramId: "seed_ig_free_001",
    username: "demo_free_creator",
    automation: {
      name: "Free Guide Bot",
      keywords: "guide,free,help",
      message: "Thanks for commenting! Here is your free guide: https://nudgedm.com/guide",
    },
  },
  {
    email: "demo-starter@nudgedm.com",
    password: "password123",
    name: "Demo Starter User",
    plan: "STARTER" as const,
    instagramId: "seed_ig_starter_002",
    username: "demo_starter_shop",
    automation: {
      name: "Starter Promo DM",
      keywords: "sale,discount,promo",
      message: "Hey! Use code STARTER10 for 10% off your order 🎉",
    },
  },
  {
    email: "demo-pro@nudgedm.com",
    password: "password123",
    name: "Demo Pro User",
    plan: "PRO" as const,
    instagramId: "seed_ig_pro_003",
    username: "demo_pro_brand",
    automation: {
      name: "Pro VIP Responder",
      keywords: "vip,exclusive,access",
      message: "Welcome to our VIP list! Check your DMs for exclusive content.",
    },
  },
];

async function ensureUser(
  email: string,
  password: string,
  name: string
): Promise<string> {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    logger.info(`User already exists, skipping auth create: ${email}`);
    return existing.id;
  }

  const result = await auth.api.signUpEmail({
    body: { email, password, name },
  });

  if (!result?.user?.id) {
    throw new Error(`Failed to create user: ${email}`);
  }

  logger.info(`Created user: ${email}`);
  return result.user.id;
}

async function seedUserData(
  userId: string,
  plan: "FREE" | "STARTER" | "PRO",
  instagramId: string,
  username: string,
  automation: { name: string; keywords: string; message: string }
) {
  await prisma.subscription.upsert({
    where: { userId },
    create: {
      userId,
      stripeCustomerId: `cus_seed_${userId.slice(0, 8)}`,
      stripeSubscriptionId: plan === "FREE" ? null : `sub_seed_${userId.slice(0, 8)}`,
      plan,
      status: "active",
    },
    update: { plan, status: "active" },
  });

  const encryptedToken = encrypt(`seed_access_token_${instagramId}`);
  await prisma.instagramAccount.upsert({
    where: { instagramId },
    create: {
      userId,
      instagramId,
      username,
      accessToken: encryptedToken,
      expiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    },
    update: { userId, username, accessToken: encryptedToken },
  });

  const existingAutomation = await prisma.automation.findFirst({
    where: { userId, name: automation.name },
  });

  let automationId: string;
  if (existingAutomation) {
    automationId = existingAutomation.id;
  } else {
    const created = await prisma.automation.create({
      data: {
        userId,
        name: automation.name,
        keywords: automation.keywords,
        message: automation.message,
        enabled: true,
        delay: 0,
      },
    });
    automationId = created.id;
  }

  const existingLog = await prisma.messageLog.findFirst({
    where: { automationId, instagramUserId: "seed_commenter_001" },
  });

  if (!existingLog) {
    await prisma.messageLog.create({
      data: {
        automationId,
        instagramUserId: "seed_commenter_001",
        comment: `Sample comment matching ${automation.keywords.split(",")[0]}`,
        message: automation.message,
        status: "SENT",
      },
    });
  }
}

async function main() {
  logger.info("Starting database seed...");

  for (const demo of DEMO_USERS) {
    const userId = await ensureUser(demo.email, demo.password, demo.name);
    await seedUserData(
      userId,
      demo.plan,
      demo.instagramId,
      demo.username,
      demo.automation
    );
    logger.info(`Seeded data for ${demo.email} (${demo.plan})`);
  }

  const counts = {
    users: await prisma.user.count(),
    subscriptions: await prisma.subscription.count(),
    instagramAccounts: await prisma.instagramAccount.count(),
    automations: await prisma.automation.count(),
    messageLogs: await prisma.messageLog.count(),
  };

  logger.info("Seed complete. Table counts:", counts);
}

main()
  .catch((err) => {
    logger.error("Seed failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
