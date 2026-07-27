import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

export interface CreateAutomationActionsBarProps {
  onDiscard: () => void;
  onCancel: () => void;
  onSave: () => void;
  isSaving?: boolean;
  error?: string | null;
}

export function CreateAutomationActionsBar({
  onDiscard,
  onCancel,
  onSave,
  isSaving = false,
  error,
}: CreateAutomationActionsBarProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white py-4 md:pl-60">
      {error && (
        <div className="mx-auto mb-3 max-w-7xl px-6">
          <p role="alert" className="rounded-lg border border-error/30 bg-error/5 px-4 py-2 text-body-md text-error">
            {error}
          </p>
        </div>
      )}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <button
          type="button"
          onClick={onDiscard}
          className="flex items-center gap-1.5 text-body-md font-medium text-error hover:underline"
        >
          <Icon name="delete" filled className="text-[18px]" />
          Discard changes
        </button>
        <div className="flex items-center gap-3">
          <Button type="button" variant="secondary" onClick={onCancel} disabled={isSaving}>
            Cancel
          </Button>
          <Button type="button" onClick={onSave} disabled={isSaving}>
            {isSaving ? "Saving…" : "Save Automation"}
          </Button>
        </div>
      </div>
    </div>
  );
}
