import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";

export interface AutomationsToolbarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
}

export function AutomationsToolbar({ searchValue, onSearchChange }: AutomationsToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative min-w-[240px] flex-1 sm:w-[280px] sm:flex-none">
        <Icon
          name="search"
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-on-surface-variant"
        />
        <Input
          type="search"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search automations..."
          aria-label="Search automations"
          className="py-2 pl-10"
        />
      </div>
      <Button type="button" variant="secondary">
        <Icon name="filter_list" className="text-[20px]" />
        Filter
      </Button>
      <Link href="/dashboard/automations/new">
        <Button type="button">
          <Icon name="add_circle" className="text-[20px]" />
          Create Automation
        </Button>
      </Link>
    </div>
  );
}
