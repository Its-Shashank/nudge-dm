import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";
import { DELAY_OPTIONS } from "@/lib/constants/dashboard";
import type { AutomationDelay } from "@/types/automation";

export interface AutomationDelayCardProps {
  delay: AutomationDelay;
  onDelayChange: (value: AutomationDelay) => void;
}

export function AutomationDelayCard({ delay, onDelayChange }: AutomationDelayCardProps) {
  return (
    <div className="rounded-2xl border border-line bg-white p-6">
      <label className="mb-3 block font-mono text-[11px] uppercase tracking-[0.1em] text-on-surface-variant">
        Response Timing
      </label>
      <div className="grid grid-cols-3 gap-3" role="radiogroup" aria-label="Response timing">
        {DELAY_OPTIONS.map((option) => {
          const selected = option.value === delay;
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onDelayChange(option.value)}
              className={cn(
                "flex flex-col items-center gap-1.5 rounded-xl border-2 p-4 transition-all",
                selected ? "border-violet bg-violet/10" : "border-line hover:border-violet/50",
              )}
            >
              <Icon
                name={option.icon}
                className={cn("text-[22px]", selected ? "text-violet" : "text-on-surface-variant")}
              />
              <span
                className={cn(
                  "text-body-md",
                  selected ? "font-semibold text-ink" : "font-medium text-on-surface",
                )}
              >
                {option.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
