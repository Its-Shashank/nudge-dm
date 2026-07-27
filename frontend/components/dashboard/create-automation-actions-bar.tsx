import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

export interface CreateAutomationActionsBarProps {
  onDiscard: () => void;
  onCancel: () => void;
  onSave: () => void;
}

export function CreateAutomationActionsBar({
  onDiscard,
  onCancel,
  onSave,
}: CreateAutomationActionsBarProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white py-4 md:pl-60">
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
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="button" onClick={onSave}>
            Save Automation
          </Button>
        </div>
      </div>
    </div>
  );
}
