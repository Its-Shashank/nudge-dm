"use server";

import { redirect } from "next/navigation";
import { createAutomation } from "@/lib/api/automations";
import { ApiError } from "@/lib/api/server";
import type { AutomationDraft } from "@/types/automation";

export interface CreateAutomationActionResult {
  error?: string;
}

export async function createAutomationAction(draft: AutomationDraft): Promise<CreateAutomationActionResult> {
  try {
    await createAutomation(draft);
  } catch (err) {
    if (err instanceof ApiError) {
      return { error: err.message };
    }
    return { error: "Something went wrong. Please try again." };
  }

  redirect("/dashboard/automations");
}
