"use client";

import { cn } from "@/lib/cn";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  reveal?: boolean;
}

export function Section({ children, className, id, reveal = true }: SectionProps) {
  const ref = useScrollReveal<HTMLElement>();

  if (!reveal) {
    return (
      <section id={id} className={className}>
        {children}
      </section>
    );
  }

  return (
    <section ref={ref} id={id} className={cn(className)}>
      {children}
    </section>
  );
}
