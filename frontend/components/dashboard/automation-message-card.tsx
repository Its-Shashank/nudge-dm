import { cn } from "@/lib/cn";
import { Textarea } from "@/components/ui/textarea";

const MAX_LENGTH = 1000;

export interface AutomationMessageCardProps {
  message: string;
  onMessageChange: (value: string) => void;
}

export function AutomationMessageCard({ message, onMessageChange }: AutomationMessageCardProps) {
  const nearLimit = message.length > 900;

  return (
    <div className="rounded-2xl border border-line bg-white p-6">
      <div className="mb-3 flex items-center justify-between">
        <label
          htmlFor="dm_textarea"
          className="block font-mono text-[11px] uppercase tracking-[0.1em] text-on-surface-variant"
        >
          Response Message
        </label>
        <span
          className={cn(
            "font-mono text-[11px] text-on-surface-variant",
            nearLimit && "text-error",
          )}
        >
          {message.length} / {MAX_LENGTH}
        </span>
      </div>
      <Textarea
        id="dm_textarea"
        rows={5}
        maxLength={MAX_LENGTH}
        value={message}
        onChange={(e) => onMessageChange(e.target.value)}
        placeholder="Hi! Here is the link to the guide you requested..."
      />
    </div>
  );
}
