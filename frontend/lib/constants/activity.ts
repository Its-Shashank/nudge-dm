export interface ActivitySummaryStat {
  icon: string;
  label: string;
  value: string;
  delta?: string;
  meta?: string;
}

export const ACTIVITY_SUMMARY_STATS: ActivitySummaryStat[] = [
  { icon: "bolt", label: "Triggers This Month", value: "3,204", delta: "+18%" },
  { icon: "send", label: "Messages Sent", value: "12,482", delta: "+14%" },
  { icon: "auto_awesome", label: "Active Automations", value: "08", meta: "Max 10" },
  { icon: "forum", label: "Avg. Reply Rate", value: "76%", delta: "+5%" },
];

export interface ActivityLogEntry {
  icon: string;
  title: string;
  subtitle: string;
  time: string;
}

export const ACTIVITY_LOG_ENTRIES: ActivityLogEntry[] = [
  {
    icon: "auto_awesome",
    title: 'Keyword Trigger: "Price"',
    subtitle: "Executed for @sarah_designs",
    time: "Just now",
  },
  {
    icon: "person_add",
    title: "New Follower Welcome",
    subtitle: "Executed for @creative_hub",
    time: "12m ago",
  },
  {
    icon: "chat",
    title: "Direct Message Automation",
    subtitle: "Executed for @marco.v",
    time: "38m ago",
  },
  {
    icon: "comment",
    title: 'Post Comment Trigger: "INFO"',
    subtitle: "Executed for @jess_travels",
    time: "1h ago",
  },
  {
    icon: "history",
    title: "Story Reply Automation",
    subtitle: "Executed for @lena.creates",
    time: "2h ago",
  },
  {
    icon: "link",
    title: "Instagram Reconnected",
    subtitle: "@lifestyle_mag re-authorized access",
    time: "3h ago",
  },
  {
    icon: "campaign",
    title: "Webinar Registration Flow",
    subtitle: "Executed for @dylan_moore",
    time: "5h ago",
  },
  {
    icon: "auto_awesome",
    title: 'Keyword Trigger: "Discount"',
    subtitle: "Executed for @priya.k",
    time: "Yesterday",
  },
  {
    icon: "person_add",
    title: "New Follower Welcome",
    subtitle: "Executed for @nate_writes",
    time: "Yesterday",
  },
  {
    icon: "bolt",
    title: "Automation Published",
    subtitle: '"Black Friday Blast" went live',
    time: "2 days ago",
  },
  {
    icon: "pause_circle",
    title: "Automation Paused",
    subtitle: '"Product Launch Teaser" paused by you',
    time: "3 days ago",
  },
  {
    icon: "chat",
    title: "Direct Message Automation",
    subtitle: "Executed for @studio.anna",
    time: "4 days ago",
  },
];
