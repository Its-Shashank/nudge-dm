import { z } from "zod";

// Kept in sync with the frontend's AutomationTrigger union (frontend/types/automation.ts).
export const AUTOMATION_TRIGGERS = [
  "post_comment",
  "story_reply",
  "new_follower",
  "direct_message",
] as const;

export const createAutomationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  enabled: z.boolean().optional().default(true),
  trigger: z.enum(AUTOMATION_TRIGGERS).optional().default("post_comment"),
  keywords: z.string().min(1, "Keywords are required (comma separated)"),
  message: z.string().min(1, "Message cannot be empty"),
  delay: z.number().int().nonnegative().optional().default(0),
});

export const updateAutomationSchema = createAutomationSchema.partial();
