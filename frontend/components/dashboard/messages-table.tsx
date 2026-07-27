import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";
import { TRIGGER_META } from "@/lib/constants/dashboard";
import { MESSAGE_STATUS_META, type MessageLogEntry } from "@/lib/constants/messages";

const COLUMNS = ["Contact", "Message", "Time", "Status", "Actions"];

const STATUS_STYLES: Record<string, string> = {
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  info: "bg-violet/10 text-violet",
  error: "bg-error/10 text-error",
};

export interface MessagesTableProps {
  messages: MessageLogEntry[];
}

export function MessagesTable({ messages }: MessagesTableProps) {
  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 px-6 py-16 text-center">
        <Icon name="search_off" className="text-3xl text-on-surface-variant/40" />
        <p className="text-body-md text-on-surface-variant">No messages match your search.</p>
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
          {messages.map((message) => {
            const trigger = TRIGGER_META[message.trigger];
            const status = MESSAGE_STATUS_META[message.status];
            return (
              <tr key={message.id} className="transition-colors hover:bg-surface-container-low/50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet/10 text-label-md font-semibold text-violet">
                      {message.handle[1]?.toUpperCase()}
                    </span>
                    <div className="text-label-md text-ink">{message.handle}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-violet">
                    <Icon name={trigger.icon} className="text-[14px]" />
                    {message.context}
                  </div>
                  <p className="mt-1 max-w-xs truncate text-body-md italic text-on-surface-variant">
                    {message.snippet}
                  </p>
                </td>
                <td className="px-6 py-4 font-mono text-[11px] text-on-surface-variant">{message.time}</td>
                <td className="px-6 py-4">
                  <span
                    className={cn(
                      "inline-block rounded-full px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.1em]",
                      STATUS_STYLES[status.tone],
                    )}
                  >
                    {status.label}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    type="button"
                    aria-label={`View conversation with ${message.handle}`}
                    className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container-low"
                  >
                    <Icon name="chevron_right" />
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
