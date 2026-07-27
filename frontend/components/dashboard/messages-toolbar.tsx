import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/cn";
import { MESSAGE_STATUS_META, type MessageStatus } from "@/lib/constants/messages";

export type MessageStatusFilter = MessageStatus | "all";

const FILTERS: { value: MessageStatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  ...(Object.entries(MESSAGE_STATUS_META) as [MessageStatus, { label: string }][]).map(
    ([value, meta]) => ({ value, label: meta.label }),
  ),
];

export interface MessagesToolbarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  statusFilter: MessageStatusFilter;
  onStatusFilterChange: (status: MessageStatusFilter) => void;
}

export function MessagesToolbar({
  searchValue,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}: MessagesToolbarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative min-w-[240px] flex-1 sm:max-w-[320px]">
        <Icon
          name="search"
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-on-surface-variant"
        />
        <Input
          type="search"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search conversations..."
          aria-label="Search conversations"
          className="py-2 pl-10"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((filter) => (
          <button
            key={filter.value}
            type="button"
            onClick={() => onStatusFilterChange(filter.value)}
            aria-pressed={statusFilter === filter.value}
            className={cn(
              "rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors",
              statusFilter === filter.value
                ? "bg-violet text-white"
                : "border border-line bg-white text-on-surface-variant hover:bg-surface-container-low",
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
}
