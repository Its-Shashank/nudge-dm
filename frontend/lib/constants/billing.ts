export const CURRENT_PLAN_DETAILS = {
  name: "Professional",
  badge: "PRO PLAN",
  price: 49,
  period: "month",
  cycle: "Monthly Billing",
  description:
    "You're currently enjoying unlimited automation templates, advanced analytics, and priority DM delivery.",
};

export interface UsageMetric {
  label: string;
  used: number;
  limit: number;
  meta?: string;
}

export const BILLING_USAGE: UsageMetric[] = [
  { label: "Messages Sent", used: 4750, limit: 5000, meta: "Renews on Aug 24, 2026" },
  { label: "Active Automations", used: 12, limit: 25 },
];

export const PAYMENT_METHOD = {
  brand: "Visa",
  last4: "4242",
  expiry: "12/2026",
  isPrimary: true,
  autoRenew: true,
};

export type BillingStatus = "paid" | "failed";

export interface BillingHistoryEntry {
  id: string;
  date: string;
  description: string;
  amount: string;
  status: BillingStatus;
}

export const BILLING_HISTORY: BillingHistoryEntry[] = [
  { id: "inv_2026_07", date: "Jul 24, 2026", description: "Professional Plan — Monthly", amount: "$49.00", status: "paid" },
  { id: "inv_2026_06", date: "Jun 24, 2026", description: "Professional Plan — Monthly", amount: "$49.00", status: "paid" },
  { id: "inv_2026_05", date: "May 24, 2026", description: "Professional Plan — Monthly", amount: "$49.00", status: "failed" },
  { id: "inv_2026_04", date: "Apr 24, 2026", description: "Professional Plan — Monthly", amount: "$49.00", status: "paid" },
  { id: "inv_2026_03", date: "Mar 24, 2026", description: "Professional Plan — Monthly", amount: "$49.00", status: "paid" },
  { id: "inv_2026_02", date: "Feb 24, 2026", description: "Professional Plan — Monthly", amount: "$49.00", status: "paid" },
  { id: "inv_2026_01", date: "Jan 24, 2026", description: "Professional Plan — Monthly", amount: "$29.00", status: "paid" },
];
