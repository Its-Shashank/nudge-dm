import type { Metadata } from "next";
import { SettingsView } from "@/components/dashboard/settings-view";

export const metadata: Metadata = {
  title: "Settings | NudgeDM",
  description: "Manage your account preferences and integrations.",
};

export default function SettingsPage() {
  return (
    <div className="p-6 md:p-12">
      <SettingsView />
    </div>
  );
}
