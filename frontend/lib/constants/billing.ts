// Plan pricing/copy isn't returned by GET /billing/subscription (Stripe owns
// it, and the backend doesn't expose it yet) — this is static product-catalog
// data, not user data, so a client-side lookup keyed by the real `plan`
// string from the API is the honest way to fill in price/description.
export interface PlanCatalogEntry {
  name: string;
  badge: string;
  price: number;
  description: string;
  upgradeTo?: "STARTER" | "PRO";
}

export const PLAN_CATALOG: Record<string, PlanCatalogEntry> = {
  FREE: {
    name: "Free",
    badge: "FREE PLAN",
    price: 0,
    description: "Up to 100 messages a month with 1 active automation. Upgrade any time.",
    upgradeTo: "STARTER",
  },
  STARTER: {
    name: "Starter",
    badge: "STARTER PLAN",
    price: 19,
    description: "5,000 messages a month with unlimited automations and story-reply triggers.",
    upgradeTo: "PRO",
  },
  PRO: {
    name: "Professional",
    badge: "PRO PLAN",
    price: 49,
    description:
      "Unlimited automation templates, advanced analytics, and priority DM delivery.",
  },
};

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
