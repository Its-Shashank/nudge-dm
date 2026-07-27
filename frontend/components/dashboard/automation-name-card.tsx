import { Input } from "@/components/ui/input";

export interface AutomationNameCardProps {
  name: string;
  onNameChange: (value: string) => void;
}

export function AutomationNameCard({ name, onNameChange }: AutomationNameCardProps) {
  return (
    <div className="rounded-2xl border border-line bg-white p-6">
      <label
        htmlFor="automation_name"
        className="mb-3 block font-mono text-[11px] uppercase tracking-[0.1em] text-on-surface-variant"
      >
        Automation Identity
      </label>
      <Input
        id="automation_name"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        placeholder="e.g., Summer Campaign E-book Delivery"
      />
    </div>
  );
}
