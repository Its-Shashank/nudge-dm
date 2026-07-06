import { Router } from "express";
import {
  checkout,
  getSubscription,
  handleWebhook,
  sandboxCheckoutSuccess,
} from "../controllers/billing.controller";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

// Public webhooks and callback helpers
router.post("/webhook", handleWebhook);
router.get("/sandbox-checkout-success", sandboxCheckoutSuccess);

// Protected subscription routes
router.use(requireAuth);
router.post("/checkout", checkout);
router.get("/subscription", getSubscription);

export default router;
