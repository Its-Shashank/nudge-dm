import { PrismaClient } from "@prisma/client";
import { logger } from "../utils/logger";

export const prisma = new PrismaClient();
export let isDbConnected = false;

export async function connectDb() {
  try {
    await prisma.$connect();
    isDbConnected = true;
    logger.info("Database connected successfully.");
  } catch (error: any) {
    isDbConnected = false;
    logger.warn(`Database connection failed: ${error.message}. Continuing in Sandbox/Mock mode.`);
  }
}

// Handle clean shutdown
process.on("beforeExit", async () => {
  await prisma.$disconnect();
});
