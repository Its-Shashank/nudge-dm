import type { Metadata } from "next";
import { AutomationsView } from "@/components/dashboard/automations-view";

export const metadata: Metadata = {
  title: "Automations | NudgeDM",
  description: "Manage and scale your Instagram engagement workflows.",
};

export default function AutomationsPage() {
  return (
    <div className="p-6 md:p-12">
      <AutomationsView />
    </div>
  );
}
