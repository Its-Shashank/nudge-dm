import type { Automation, AutomationTrigger } from "@/types/automation";
import { TRIGGER_META } from "@/lib/constants/dashboard";

export interface BackendAutomation {
  id: string;
  name: string;
  enabled: boolean;
  trigger: string;
  keywords: string;
  message: string;
  delay: number;
  createdAt: string;
  updatedAt: string;
  _count?: { logs: number };
}

const KNOWN_TRIGGERS = new Set<AutomationTrigger>([
  "post_comment",
  "story_reply",
  "new_follower",
  "direct_message",
]);

function normalizeTrigger(trigger: string): AutomationTrigger {
  return KNOWN_TRIGGERS.has(trigger as AutomationTrigger)
    ? (trigger as AutomationTrigger)
    : "post_comment";
}

function formatCreatedLabel(isoDate: string): string {
  const diffMs = Date.now() - new Date(isoDate).getTime();
  const diffMinutes = Math.floor(diffMs / (60 * 1000));
  const diffHours = Math.floor(diffMs / (60 * 60 * 1000));
  const diffDays = Math.floor(diffMs / (24 * 60 * 60 * 1000));
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);

  if (diffMinutes < 1) return "Created just now";
  if (diffMinutes < 60) return `Created ${diffMinutes} minute${diffMinutes === 1 ? "" : "s"} ago`;
  if (diffHours < 24) return `Created ${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  if (diffDays < 7) return `Created ${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
  if (diffWeeks < 5) return `Created ${diffWeeks} week${diffWeeks === 1 ? "" : "s"} ago`;
  return `Created ${diffMonths} month${diffMonths === 1 ? "" : "s"} ago`;
}

export function toAutomation(row: BackendAutomation): Automation {
  const trigger = normalizeTrigger(row.trigger);
  return {
    id: row.id,
    name: row.name,
    createdLabel: formatCreatedLabel(row.createdAt),
    icon: TRIGGER_META[trigger].icon,
    trigger,
    keywords: row.keywords
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean),
    messagesSent: row._count?.logs ?? 0,
    enabled: row.enabled,
  };
}
