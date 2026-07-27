import { Switch } from "@/components/ui/switch";

export interface AutomationStatusCardProps {
  enabled: boolean;
  onEnabledChange: (value: boolean) => void;
}

export function AutomationStatusCard({ enabled, onEnabledChange }: AutomationStatusCardProps) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-line bg-white p-6">
      <div>
        <p className="text-body-lg font-semibold text-ink">Automation Status</p>
        <p className="text-body-md text-on-surface-variant">
          Toggle to enable or disable this flow.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Switch
          checked={enabled}
          onCheckedChange={onEnabledChange}
          label="Toggle automation status"
        />
        <span className="text-body-md font-medium text-ink">
          {enabled ? "Enabled" : "Disabled"}
        </span>
      </div>
    </div>
  );
}
