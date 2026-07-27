import type { Metadata } from "next";
import { CreateAutomationView } from "@/components/dashboard/create-automation-view";

export const metadata: Metadata = {
  title: "Create Automation | NudgeDM",
  description: "Set up a new Instagram engagement workflow.",
};

export default function CreateAutomationPage() {
  return (
    <div className="p-6 md:p-12">
      <CreateAutomationView />
    </div>
  );
}
