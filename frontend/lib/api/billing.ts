import "server-only";
import { backendFetch } from "./server";

export interface SubscriptionDetails {
  plan: string;
  status: string;
  customerId: string | null;
  subscriptionId: string | null;
  usage: number;
  limit: number;
}

export async function getSubscription(): Promise<SubscriptionDetails> {
  return backendFetch<SubscriptionDetails>("/billing/subscription");
}

export async function createCheckoutSession(plan: "STARTER" | "PRO"): Promise<string> {
  const { url } = await backendFetch<{ url: string }>("/billing/checkout", {
    method: "POST",
    body: { plan },
  });
  return url;
}
