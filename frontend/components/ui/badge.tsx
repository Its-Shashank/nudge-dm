import { cn } from "@/lib/cn";
import { Icon } from "./icon";

export interface BadgeProps {
  icon?: string;
  children: React.ReactNode;
  className?: string;
}

export function Badge({ icon, children, className }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 px-2 py-1 bg-surface-container-high rounded-full",
        className,
      )}
    >
      {icon && <Icon name={icon} className="text-primary scale-75" />}
      <span className="text-label-sm text-primary">{children}</span>
    </div>
  );
}
