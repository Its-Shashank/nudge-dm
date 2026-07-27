import { Icon } from "@/components/ui/icon";
import { TRIGGER_META } from "@/lib/constants/dashboard";
import type { AutomationTrigger } from "@/types/automation";

export interface AutomationTriggerCardProps {
  trigger: AutomationTrigger;
}

export function AutomationTriggerCard({ trigger }: AutomationTriggerCardProps) {
  const meta = TRIGGER_META[trigger];

  return (
    <div className="rounded-2xl border border-line bg-white p-6">
      <div className="mb-3 flex items-center justify-between">
        <label className="block font-mono text-[11px] uppercase tracking-[0.1em] text-on-surface-variant">
          Trigger Event
        </label>
        <span className="rounded-full bg-violet/10 px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-wide text-violet">
          Event
        </span>
      </div>
      <div className="flex items-center gap-3 rounded-xl border border-dashed border-line bg-surface-container-low p-4">
        <Icon name={meta.icon} className="text-[32px] text-violet" />
        <div>
          <p className="text-body-lg font-semibold text-ink">When someone comments</p>
          <p className="text-body-md text-on-surface-variant">
            Trigger this workflow on any post comment
          </p>
        </div>
      </div>
    </div>
  );
}
