"use client";

import { useMemo, useState } from "react";
import { MessagesTable } from "./messages-table";
import { MessagesToolbar, type MessageStatusFilter } from "./messages-toolbar";
import { MOCK_MESSAGES } from "@/lib/constants/messages";

export function MessagesView() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<MessageStatusFilter>("all");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return MOCK_MESSAGES.filter((message) => {
      const matchesQuery =
        !query ||
        message.handle.toLowerCase().includes(query) ||
        message.snippet.toLowerCase().includes(query) ||
        message.context.toLowerCase().includes(query);
      const matchesStatus = statusFilter === "all" || message.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [search, statusFilter]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-headline-lg text-ink">Messages</h1>
        <p className="mt-1 text-body-md text-on-surface-variant">
          Every DM your automations have sent, replied to, or flagged for review.
        </p>
      </div>

      <MessagesToolbar
        searchValue={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />

      <div className="mt-6 overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
        <MessagesTable messages={filtered} />
      </div>
    </div>
  );
}
