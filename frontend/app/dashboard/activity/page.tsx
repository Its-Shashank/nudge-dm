import type { Metadata } from "next";
import { ActivityEmptyState } from "@/components/dashboard/activity-empty-state";
import { ActivityView } from "@/components/dashboard/activity-view";

export const metadata: Metadata = {
  title: "Activity | NudgeDM",
  description: "A running log of every automation trigger and message across your account.",
};

// Mocked pending real activity data.
const hasActivity = true;

export default function ActivityPage() {
  if (!hasActivity) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-6 md:p-12">
        <ActivityEmptyState />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-6 md:p-12">
      <ActivityView />
    </div>
  );
}
