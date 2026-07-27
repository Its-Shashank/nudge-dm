import { cn } from "@/lib/cn";
import { Icon } from "./icon";

export interface BadgeProps {
  icon?: string;
  dot?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function Badge({ icon, dot = true, children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-violet",
        className,
      )}
    >
      {dot && (
        <span className="relative flex h-1.5 w-1.5 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-violet" />
        </span>
      )}
      {icon && <Icon name={icon} className="text-[14px]" />}
      {children}
    </span>
  );
}
