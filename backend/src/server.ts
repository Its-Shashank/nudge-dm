import dotenv from "dotenv";
// Load env vars at the very start
dotenv.config();

import app from "./app";
import { connectDb } from "./config/db";
import { logger } from "./utils/logger";

const PORT = process.env.PORT || 5001;

async function bootstrap() {
  // Connect to Prisma DB (lazy failure handling so sandbox functions offline if required)
  await connectDb();

  app.listen(PORT, () => {
    logger.info(`NudgeDM server started on port ${PORT} in ${process.env.NODE_ENV || "development"} mode`);
    logger.info(`Better Auth mounted on: ${process.env.BETTER_AUTH_URL || "http://localhost:5001"}`);
    if (process.env.SANDBOX_MODE === "true") {
      logger.warn("Server is running in SANDBOX_MODE=true. Mocked handlers are active.");
    }
  });
}

bootstrap().catch((error) => {
  logger.error("Bootstrap critical error:", error);
  process.exit(1);
});
