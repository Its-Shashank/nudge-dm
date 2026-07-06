import { Router } from "express";
import {
  connectInstagram,
  instagramCallback,
  getConnectedAccount,
  disconnectInstagram,
  verifyWebhook,
  handleWebhookEvent,
} from "../controllers/instagram.controller";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

// Public Webhook endpoints
router.get("/webhook", verifyWebhook);
router.post("/webhook", handleWebhookEvent);

// Public OAuth callback
router.get("/callback", instagramCallback);

// Protected endpoints
router.get("/connect", requireAuth, connectInstagram);
router.get("/account", requireAuth, getConnectedAccount);
router.delete("/disconnect", requireAuth, disconnectInstagram);

export default router;
