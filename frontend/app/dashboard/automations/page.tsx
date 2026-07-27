import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AutomationsView } from "@/components/dashboard/automations-view";
import { listAutomations } from "@/lib/api/automations";
import { ApiError } from "@/lib/api/server";

export const metadata: Metadata = {
  title: "Automations | NudgeDM",
  description: "Manage and scale your Instagram engagement workflows.",
};

export default async function AutomationsPage() {
  let automations;
  try {
    automations = await listAutomations();
  } catch (err) {
    if (err instanceof ApiError && err.status === 401) {
      redirect("/login");
    }
    throw err;
  }

  return (
    <div className="p-6 md:p-12">
      <AutomationsView initialAutomations={automations} />
    </div>
  );
}
