import "server-only";
import type { Automation, AutomationDelay, AutomationDraft } from "@/types/automation";
import { backendFetch } from "./server";
import { toAutomation, type BackendAutomation } from "./mappers/automation";

function delayToSeconds(delay: AutomationDelay): number {
  switch (delay) {
    case "immediate":
      return 0;
    case "1_minute":
      return 60;
    case "5_minutes":
      return 300;
  }
}

function draftToBody(draft: AutomationDraft) {
  return {
    name: draft.name,
    enabled: draft.enabled,
    trigger: draft.trigger,
    keywords: draft.keywords.join(","),
    message: draft.message,
    delay: delayToSeconds(draft.delay),
  };
}

export async function listAutomations(): Promise<Automation[]> {
  const rows = await backendFetch<BackendAutomation[]>("/automations");
  return rows.map(toAutomation);
}

export async function getAutomation(id: string): Promise<Automation> {
  const row = await backendFetch<BackendAutomation>(`/automations/${id}`);
  return toAutomation(row);
}

export async function createAutomation(draft: AutomationDraft): Promise<Automation> {
  const row = await backendFetch<BackendAutomation>("/automations", {
    method: "POST",
    body: draftToBody(draft),
  });
  return toAutomation(row);
}

export async function deleteAutomation(id: string): Promise<void> {
  await backendFetch<{ success: boolean }>(`/automations/${id}`, { method: "DELETE" });
}

export async function setAutomationEnabled(id: string, enabled: boolean): Promise<Automation> {
  const row = await backendFetch<BackendAutomation>(`/automations/${id}`, {
    method: "PATCH",
    body: { enabled },
  });
  return toAutomation(row);
}
