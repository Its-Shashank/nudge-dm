import type { Metadata } from "next";
import { MessagesEmptyState } from "@/components/dashboard/messages-empty-state";
import { MessagesView } from "@/components/dashboard/messages-view";

export const metadata: Metadata = {
  title: "Messages | NudgeDM",
  description: "Every DM your automations have sent, replied to, or flagged for review.",
};

// Mocked pending real message log data.
const hasMessages = true;

export default function MessagesPage() {
  if (!hasMessages) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-6 md:p-12">
        <MessagesEmptyState />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-12">
      <MessagesView />
    </div>
  );
}
