"use client";

import { useMemo, useState } from "react";
import { AutomationTips } from "./automation-tips";
import { AutomationsEmptyState } from "./automations-empty-state";
import { AutomationsPagination } from "./automations-pagination";
import { AutomationsTable } from "./automations-table";
import { AutomationsToolbar } from "./automations-toolbar";
import type { Automation } from "@/types/automation";

const PAGE_SIZE = 4;

export interface AutomationsViewProps {
  initialAutomations: Automation[];
}

export function AutomationsView({ initialAutomations }: AutomationsViewProps) {
  const [automations, setAutomations] = useState(initialAutomations);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return automations;
    return automations.filter(
      (automation) =>
        automation.name.toLowerCase().includes(query) ||
        automation.keywords.some((keyword) => keyword.toLowerCase().includes(query)),
    );
  }, [automations, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(1);
  }

  async function handleToggle(id: string) {
    const target = automations.find((a) => a.id === id);
    if (!target) return;
    const nextEnabled = !target.enabled;

    // Optimistic update — revert if the request fails.
    setAutomations((prev) =>
      prev.map((automation) => (automation.id === id ? { ...automation, enabled: nextEnabled } : automation)),
    );

    try {
      const res = await fetch(`/api/automations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled: nextEnabled }),
      });
      if (!res.ok) throw new Error("Failed to update automation");
    } catch {
      setAutomations((prev) =>
        prev.map((automation) => (automation.id === id ? { ...automation, enabled: !nextEnabled } : automation)),
      );
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!window.confirm(`Delete "${name}"? This can't be undone.`)) return;

    const previous = automations;
    setAutomations((prev) => prev.filter((automation) => automation.id !== id));

    try {
      const res = await fetch(`/api/automations/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete automation");
    } catch {
      setAutomations(previous);
    }
  }

  if (automations.length === 0) {
    return (
      <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
        <AutomationsEmptyState />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-headline-lg text-ink">Automations</h1>
          <p className="mt-1 text-body-md text-on-surface-variant">
            Manage and scale your Instagram engagement workflows.
          </p>
        </div>
        <AutomationsToolbar searchValue={search} onSearchChange={handleSearchChange} />
      </div>

      <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
        <AutomationsTable automations={paginated} onToggle={handleToggle} onDelete={handleDelete} />
        {filtered.length > 0 && (
          <AutomationsPagination
            page={currentPage}
            totalPages={totalPages}
            totalItems={filtered.length}
            pageSize={PAGE_SIZE}
            onPageChange={setPage}
          />
        )}
      </div>

      <AutomationTips />
    </div>
  );
}
