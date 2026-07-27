"use server";

import { redirect } from "next/navigation";
import { createCheckoutSession } from "@/lib/api/billing";

export async function upgradePlanAction(plan: "STARTER" | "PRO") {
  const url = await createCheckoutSession(plan);
  redirect(url);
}
