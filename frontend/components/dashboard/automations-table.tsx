import { Icon } from "@/components/ui/icon";
import { Switch } from "@/components/ui/switch";
import { TRIGGER_META } from "@/lib/constants/dashboard";
import type { Automation } from "@/types/automation";

const COLUMNS = ["Automation", "Trigger", "Keywords", "Messages Sent", "Status", "Actions"];

export interface AutomationsTableProps {
  automations: Automation[];
  onToggle: (id: string) => void;
}

export function AutomationsTable({ automations, onToggle }: AutomationsTableProps) {
  if (automations.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 px-6 py-16 text-center">
        <Icon name="search_off" className="text-3xl text-on-surface-variant/40" />
        <p className="text-body-md text-on-surface-variant">No automations match your search.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-line bg-surface-container-low">
            {COLUMNS.map((column) => (
              <th
                key={column}
                className="px-6 py-4 font-mono text-[11px] uppercase tracking-[0.1em] text-on-surface-variant last:text-right"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {automations.map((automation) => {
            const trigger = TRIGGER_META[automation.trigger];
            return (
              <tr key={automation.id} className="transition-colors hover:bg-surface-container-low/50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-violet/10 p-2 text-violet">
                      <Icon name={automation.icon} />
                    </div>
                    <div>
                      <div className="text-label-md text-ink">{automation.name}</div>
                      <div className="text-[12px] text-on-surface-variant">{automation.createdLabel}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="flex items-center gap-1.5 text-body-md text-on-surface">
                    <Icon name={trigger.icon} className="text-[18px] text-on-surface-variant" />
                    {trigger.label}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {automation.keywords.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {automation.keywords.map((keyword) => (
                        <span
                          key={keyword}
                          className="rounded bg-violet/10 px-2 py-0.5 font-mono text-[11px] uppercase tracking-wide text-violet"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-body-md italic text-on-surface-variant">None</span>
                  )}
                </td>
                <td className="px-6 py-4 text-label-md font-semibold text-ink">
                  {automation.messagesSent.toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <Switch
                    checked={automation.enabled}
                    onCheckedChange={() => onToggle(automation.id)}
                    label={`Toggle ${automation.name}`}
                  />
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    type="button"
                    aria-label={`More actions for ${automation.name}`}
                    className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container-low"
                  >
                    <Icon name="more_horiz" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
