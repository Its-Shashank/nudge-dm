import { z } from "zod";

export const createAutomationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  enabled: z.boolean().optional().default(true),
  trigger: z.string().optional().default("COMMENT"),
  keywords: z.string().min(1, "Keywords are required (comma separated)"),
  message: z.string().min(1, "Message cannot be empty"),
  delay: z.number().int().nonnegative().optional().default(0),
});

export const updateAutomationSchema = createAutomationSchema.partial();
