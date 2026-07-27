import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";

export interface AutomationsPaginationProps {
  page: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export function AutomationsPagination({
  page,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}: AutomationsPaginationProps) {
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalItems);

  return (
    <div className="flex items-center justify-between border-t border-line bg-surface-container-low/30 px-6 py-4">
      <p className="text-label-sm text-on-surface-variant">
        Showing {start}-{end} of {totalItems} automations
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Previous page"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="rounded-lg border border-line p-2 text-on-surface-variant transition-colors hover:bg-white disabled:pointer-events-none disabled:opacity-50"
        >
          <Icon name="chevron_left" className="text-[20px]" />
        </button>
        <div className="flex items-center gap-1 px-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              aria-current={n === page ? "page" : undefined}
              onClick={() => onPageChange(n)}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-md text-label-sm transition-colors",
                n === page
                  ? "bg-violet text-white"
                  : "text-on-surface-variant hover:bg-surface-container-low",
              )}
            >
              {n}
            </button>
          ))}
        </div>
        <button
          type="button"
          aria-label="Next page"
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className="rounded-lg border border-line p-2 text-on-surface-variant transition-colors hover:bg-white disabled:pointer-events-none disabled:opacity-50"
        >
          <Icon name="chevron_right" className="text-[20px]" />
        </button>
      </div>
    </div>
  );
}
