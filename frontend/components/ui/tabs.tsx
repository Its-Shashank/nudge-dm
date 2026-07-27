"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface TabItem {
  id: string;
  label: string;
}

export interface TabsProps {
  tabs: TabItem[];
  defaultTabId?: string;
  children: (activeTabId: string) => React.ReactNode;
  className?: string;
}

export function Tabs({ tabs, defaultTabId, children, className }: TabsProps) {
  const [activeTabId, setActiveTabId] = useState(defaultTabId ?? tabs[0]?.id);

  return (
    <div className={className}>
      <div
        role="tablist"
        className="flex gap-6 overflow-x-auto border-b border-line"
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTabId(tab.id)}
              className={cn(
                "relative shrink-0 whitespace-nowrap pb-3 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors",
                isActive
                  ? "text-violet"
                  : "text-on-surface-variant hover:text-ink",
              )}
            >
              {tab.label}
              {isActive && (
                <span className="absolute inset-x-0 -bottom-px h-0.5 bg-violet" />
              )}
            </button>
          );
        })}
      </div>
      <div className="mt-6">{children(activeTabId)}</div>
    </div>
  );
}
