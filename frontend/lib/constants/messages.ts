import type { AutomationTrigger } from "@/types/automation";

export type MessageStatus = "auto_replied" | "pending" | "manual" | "failed";

export interface MessageStatusMeta {
  label: string;
  tone: "success" | "warning" | "info" | "error";
}

export const MESSAGE_STATUS_META: Record<MessageStatus, MessageStatusMeta> = {
  auto_replied: { label: "Auto-replied", tone: "success" },
  pending: { label: "Pending", tone: "warning" },
  manual: { label: "Manual", tone: "info" },
  failed: { label: "Failed", tone: "error" },
};

export interface MessageLogEntry {
  id: string;
  handle: string;
  trigger: AutomationTrigger;
  context: string;
  snippet: string;
  time: string;
  status: MessageStatus;
}

export const MOCK_MESSAGES: MessageLogEntry[] = [
  {
    id: "1",
    handle: "@sarah_style",
    trigger: "post_comment",
    context: 'Comment on "Summer Launch Post"',
    snippet: "Hey Sarah! Check your DMs for the exclusive link waiting for you.",
    time: "2m ago",
    status: "auto_replied",
  },
  {
    id: "2",
    handle: "@tech_guru_alex",
    trigger: "direct_message",
    context: 'Direct Message: "Pricing"',
    snippet: "Absolutely Alex! Our basic plan starts at $29/month with a 14-day trial.",
    time: "15m ago",
    status: "manual",
  },
  {
    id: "3",
    handle: "@marco.v",
    trigger: "direct_message",
    context: 'Direct Message: "Collab"',
    snippet: "What are the pricing details for a sponsored collaboration post?",
    time: "45m ago",
    status: "pending",
  },
  {
    id: "4",
    handle: "@creative_studio_london",
    trigger: "story_reply",
    context: "Story Mention",
    snippet: "Thanks for the mention! We've added a discount code just for you.",
    time: "1h ago",
    status: "auto_replied",
  },
  {
    id: "5",
    handle: "@fit_with_jake",
    trigger: "post_comment",
    context: 'Comment on "Workout Routine"',
    snippet: "Oops, it looks like this message couldn't be sent to your inbox.",
    time: "3h ago",
    status: "failed",
  },
  {
    id: "6",
    handle: "@nomad_vibes",
    trigger: "new_follower",
    context: "New Follower Welcome",
    snippet: "Welcome to the community! Here is your starter guide and resources.",
    time: "5h ago",
    status: "auto_replied",
  },
  {
    id: "7",
    handle: "@jess_travels",
    trigger: "post_comment",
    context: 'Comment on "Bali Reels"',
    snippet: "Loved the collaboration idea, following up on our chat!",
    time: "6h ago",
    status: "pending",
  },
  {
    id: "8",
    handle: "@studio.wren",
    trigger: "story_reply",
    context: "Story Reply",
    snippet: "Just replied to your story — do you ship internationally?",
    time: "8h ago",
    status: "manual",
  },
  {
    id: "9",
    handle: "@the.morning.brew",
    trigger: "new_follower",
    context: "New Follower Welcome",
    snippet: "Excited to be here! Any tips for getting started with automations?",
    time: "1d ago",
    status: "auto_replied",
  },
];
