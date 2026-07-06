import { Router } from "express";
import {
  getAutomations,
  getAutomation,
  createAutomation,
  updateAutomation,
  deleteAutomation,
} from "../controllers/automation.controller";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

router.use(requireAuth);

router.get("/", getAutomations);
router.post("/", createAutomation);
router.get("/:id", getAutomation);
router.patch("/:id", updateAutomation);
router.delete("/:id", deleteAutomation);

export default router;
