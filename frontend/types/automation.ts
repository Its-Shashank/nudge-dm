export type AutomationTrigger =
  | "post_comment"
  | "story_reply"
  | "new_follower"
  | "direct_message";

export type AutomationDelay = "immediate" | "1_minute" | "5_minutes";

export interface Automation {
  id: string;
  name: string;
  createdLabel: string;
  icon: string;
  trigger: AutomationTrigger;
  keywords: string[];
  messagesSent: number;
  enabled: boolean;
}

export interface AutomationDraft {
  name: string;
  trigger: AutomationTrigger;
  keywords: string[];
  message: string;
  delay: AutomationDelay;
  enabled: boolean;
}
