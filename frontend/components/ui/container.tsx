import { cn } from "@/lib/cn";

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section";
  id?: string;
}

export function Container({
  children,
  className,
  as: Component = "div",
  id,
}: ContainerProps) {
  return (
    <Component
      id={id}
      className={cn("px-page max-w-screen-2xl mx-auto w-full", className)}
    >
      {children}
    </Component>
  );
}
