import type { Automation, AutomationDelay, AutomationDraft, AutomationTrigger } from "@/types/automation";

export const DASHBOARD_NAV_LINKS = [
  { label: "Dashboard", href: "/dashboard", icon: "dashboard" },
  { label: "Automations", href: "/dashboard/automations", icon: "bolt" },
  { label: "Messages", href: "/dashboard/messages", icon: "mail" },
  { label: "Connections", href: "/dashboard/connections", icon: "link" },
  { label: "Activity", href: "/dashboard/activity", icon: "analytics" },
] as const;

export const CONNECTED_INSTAGRAM_ACCOUNT = {
  handle: "@lifestyle_mag",
  status: "Connected",
};

export interface DashboardMetric {
  label: string;
  value: string;
  delta?: string;
  meta?: string;
}

export const DASHBOARD_METRICS: DashboardMetric[] = [
  { label: "Messages Sent", value: "12,482", delta: "+14%" },
  { label: "Active Automations", value: "08", meta: "Max 10" },
];

export const CURRENT_PLAN = {
  name: "Professional",
  nextBilling: "Next billing: Oct 24",
};

export const RECENT_DMS = [
  {
    handle: "@sarah_designs",
    message: "Hey! Just saw your new post...",
    time: "2m ago",
    status: "Auto-replied",
    statusTone: "success",
  },
  {
    handle: "@marco.v",
    message: "What are the pricing details?",
    time: "45m ago",
    status: "Link Sent",
    statusTone: "info",
  },
  {
    handle: "@jess_travels",
    message: "Loved the collaboration idea!",
    time: "1h ago",
    status: "Pending",
    statusTone: "warning",
  },
] as const;

export const AUTOMATION_LOG_ENTRIES = [
  {
    icon: "auto_awesome",
    title: 'Keyword Trigger: "Price"',
    subtitle: "Executed for @user_88",
    time: "Just now",
  },
  {
    icon: "person_add",
    title: "New Follower Welcome",
    subtitle: "Executed for @creative_hub",
    time: "12m ago",
  },
] as const;

export const PLATFORM_STATUS_ITEMS = [
  { label: "API Connection", status: "Stable", pulse: true },
  { label: "Database Sync", status: "Syncing", pulse: false },
] as const;

export const INSTAGRAM_CONNECT_FEATURES = [
  {
    icon: "auto_awesome",
    title: "Smart Replies",
    description: "Automate responses to common inquiries instantly.",
  },
  {
    icon: "campaign",
    title: "Keyword Triggers",
    description: "Launch workflows based on specific words in DMs.",
  },
  {
    icon: "bar_chart",
    title: "Analytics",
    description: "Track engagement and conversion rates in real-time.",
  },
] as const;

export const TRIGGER_META: Record<AutomationTrigger, { label: string; icon: string }> = {
  post_comment: { label: "Post Comment", icon: "comment" },
  story_reply: { label: "Story Reply", icon: "history" },
  new_follower: { label: "New Follower", icon: "person_outline" },
  direct_message: { label: "Direct Message", icon: "chat" },
};

export const MOCK_AUTOMATIONS: Automation[] = [
  {
    id: "1",
    name: "Summer Sale DM",
    createdLabel: "Created 2 days ago",
    icon: "auto_awesome",
    trigger: "post_comment",
    keywords: ["SUMMER", "INFO"],
    messagesSent: 1284,
    enabled: true,
  },
  {
    id: "2",
    name: "Story Reply Lead Gen",
    createdLabel: "Created 1 week ago",
    icon: "alternate_email",
    trigger: "story_reply",
    keywords: ["TIPS"],
    messagesSent: 842,
    enabled: true,
  },
  {
    id: "3",
    name: "New Follower Welcome",
    createdLabel: "Created 3 weeks ago",
    icon: "person_add",
    trigger: "new_follower",
    keywords: [],
    messagesSent: 4912,
    enabled: false,
  },
  {
    id: "4",
    name: "Webinar Registration",
    createdLabel: "Created 1 month ago",
    icon: "campaign",
    trigger: "direct_message",
    keywords: ["ZOOM", "LINK"],
    messagesSent: 2105,
    enabled: true,
  },
  {
    id: "5",
    name: "Free Guide Giveaway",
    createdLabel: "Created 1 month ago",
    icon: "auto_awesome",
    trigger: "post_comment",
    keywords: ["GUIDE", "PDF"],
    messagesSent: 3211,
    enabled: true,
  },
  {
    id: "6",
    name: "Discount Code Reply",
    createdLabel: "Created 5 weeks ago",
    icon: "alternate_email",
    trigger: "post_comment",
    keywords: ["DISCOUNT"],
    messagesSent: 976,
    enabled: true,
  },
  {
    id: "7",
    name: "Product Launch Teaser",
    createdLabel: "Created 2 months ago",
    icon: "campaign",
    trigger: "story_reply",
    keywords: ["LAUNCH"],
    messagesSent: 543,
    enabled: false,
  },
  {
    id: "8",
    name: "Podcast Guest Booking",
    createdLabel: "Created 2 months ago",
    icon: "person_add",
    trigger: "direct_message",
    keywords: [],
    messagesSent: 128,
    enabled: true,
  },
  {
    id: "9",
    name: "Black Friday Blast",
    createdLabel: "Created 3 months ago",
    icon: "auto_awesome",
    trigger: "post_comment",
    keywords: ["BF", "DEAL"],
    messagesSent: 5820,
    enabled: true,
  },
  {
    id: "10",
    name: "Affiliate Signup Flow",
    createdLabel: "Created 3 months ago",
    icon: "campaign",
    trigger: "direct_message",
    keywords: ["AFFILIATE"],
    messagesSent: 2456,
    enabled: true,
  },
  {
    id: "11",
    name: "Course Waitlist",
    createdLabel: "Created 4 months ago",
    icon: "alternate_email",
    trigger: "post_comment",
    keywords: ["WAITLIST"],
    messagesSent: 1673,
    enabled: false,
  },
  {
    id: "12",
    name: "Community Invite",
    createdLabel: "Created 4 months ago",
    icon: "person_add",
    trigger: "new_follower",
    keywords: [],
    messagesSent: 987,
    enabled: true,
  },
];

export const DELAY_OPTIONS: { value: AutomationDelay; label: string; icon: string }[] = [
  { value: "immediate", label: "Immediately", icon: "bolt" },
  { value: "1_minute", label: "1 minute", icon: "timer" },
  { value: "5_minutes", label: "5 minutes", icon: "schedule" },
];

export const DEFAULT_AUTOMATION_DRAFT: AutomationDraft = {
  name: "",
  trigger: "post_comment",
  keywords: [],
  message: "",
  delay: "immediate",
  enabled: true,
};

export const AUTOMATION_TIPS = [
  {
    icon: "lightbulb",
    title: "Pro Tip: Story Mentions",
    description:
      "Automate a \"Thank You\" DM whenever someone mentions you in their Stories to boost loyalty.",
  },
  {
    icon: "trending_up",
    title: "Growth Insight",
    description:
      "Your \"Summer Sale\" automation has a 92% reply rate. Consider running it for 3 more days.",
  },
  {
    icon: "help_center",
    title: "Need Help?",
    description: "Check out our guide on high-conversion trigger keywords to optimize your flows.",
  },
] as const;
