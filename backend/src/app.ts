import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";

// Middleware imports
import { errorHandler } from "./middleware/error.middleware";
import { rateLimitAuth, rateLimitWebhook } from "./middleware/rate-limiter.middleware";

// Routes imports
import authRoutes from "./routes/auth.routes";
import instagramRoutes from "./routes/instagram.routes";
import automationRoutes from "./routes/automation.routes";
import billingRoutes from "./routes/billing.routes";
import dashboardRoutes from "./routes/dashboard.routes";

const app = express();

// Enable CORS
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);

// Intercept raw requests to cache body for signature verification (Stripe / Meta Webhooks)
app.use(
  express.json({
    verify: (req: any, _res, buf) => {
      req.rawBody = buf;
    },
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Request logger middleware
app.use((req, _res, next) => {
  const now = new Date().toISOString();
  console.log(`[${now}] ${req.method} ${req.path}`);
  next();
});

// Better Auth native fallback handler
app.all("/api/auth/*", toNodeHandler(auth));

// Mount application routes
app.use("/auth", rateLimitAuth, authRoutes);
app.use("/instagram", rateLimitWebhook, instagramRoutes);
app.use("/automations", automationRoutes);
app.use("/billing", billingRoutes);
app.use("/dashboard", dashboardRoutes);

// Base route for API status
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok", time: new Date() });
});

// Error handling middleware
app.use(errorHandler);

export default app;
