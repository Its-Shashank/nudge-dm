"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";
import { DASHBOARD_NAV_LINKS } from "@/lib/constants/dashboard";

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-16 z-40 hidden h-[calc(100vh-4rem)] w-60 flex-col border-r border-line bg-white py-6 md:flex">
      <nav className="flex-1 space-y-1 px-3">
        {DASHBOARD_NAV_LINKS.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg border-l-4 border-transparent px-3 py-2.5 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors",
                active
                  ? "border-violet bg-violet/10 text-violet"
                  : "text-on-surface-variant hover:bg-surface-container-low hover:text-ink",
              )}
            >
              <Icon name={link.icon} className="text-[18px]" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3">
        <Button size="md" className="w-full">
          <Icon name="add" className="text-[16px]" />
          New Workflow
        </Button>
      </div>
    </aside>
  );
}
