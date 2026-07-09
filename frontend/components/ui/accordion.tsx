"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "./icon";

export interface AccordionItem {
  question: string;
  answer: string;
}

export interface AccordionProps {
  items: readonly AccordionItem[];
  className?: string;
}

export function Accordion({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={cn("space-y-4", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={item.question}
            className="bg-surface-container-low rounded-xl border border-outline-variant transition-all hover:bg-surface-container-high"
          >
            <button
              type="button"
              className="flex w-full justify-between items-center p-6 cursor-pointer text-left"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
            >
              <span className="text-headline-md text-on-surface pr-md">
                {item.question}
              </span>
              <Icon
                name="expand_more"
                className={cn(
                  "text-on-surface-variant shrink-0 transition-transform",
                  isOpen && "rotate-180",
                )}
              />
            </button>
            <div
              className={cn(
                "grid transition-all duration-200",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-6 text-on-surface-variant">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
