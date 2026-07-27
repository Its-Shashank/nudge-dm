"use client";

import { useMemo, useState } from "react";
import { AutomationTips } from "./automation-tips";
import { AutomationsPagination } from "./automations-pagination";
import { AutomationsTable } from "./automations-table";
import { AutomationsToolbar } from "./automations-toolbar";
import { MOCK_AUTOMATIONS } from "@/lib/constants/dashboard";

const PAGE_SIZE = 4;

export function AutomationsView() {
  const [automations, setAutomations] = useState(MOCK_AUTOMATIONS);
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

  function handleToggle(id: string) {
    setAutomations((prev) =>
      prev.map((automation) =>
        automation.id === id ? { ...automation, enabled: !automation.enabled } : automation,
      ),
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
        <AutomationsTable automations={paginated} onToggle={handleToggle} />
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
