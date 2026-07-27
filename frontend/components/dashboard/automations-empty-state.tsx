import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

export function AutomationsEmptyState() {
  return (
    <div className="mx-auto w-full max-w-2xl text-center">
      <div className="mx-auto max-w-md">
        <div className="relative mx-auto flex h-48 w-48 items-center justify-center">
          <div className="absolute inset-0 -z-10 scale-150 rounded-full instagram-gradient opacity-10 blur-3xl" />

          <div
            className="absolute inset-0 rounded-full border-2 border-dashed border-line motion-safe:animate-spin"
            style={{ animationDuration: "20s" }}
          />

          <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-line bg-white shadow-xl">
            <Icon name="bolt" filled className="text-4xl text-violet" />
          </div>
        </div>

        <div className="mt-8 space-y-3">
          <h1 className="text-headline-lg text-ink">No automations yet</h1>
          <p className="text-body-lg text-on-surface-variant">
            Create your first automation to start turning comments and DMs into customers,
            automatically.
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4">
          <Link href="/dashboard/automations/new">
            <Button type="button" size="lg" className="shadow-xl hover:scale-[1.03]">
              <Icon name="add_circle" />
              Create Automation
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-16 flex items-start gap-3 rounded-2xl border border-line bg-white p-5 text-left">
        <Icon name="lightbulb" className="mt-0.5 shrink-0 text-violet" />
        <p className="text-body-md text-on-surface-variant">
          <span className="font-semibold text-ink">Pro tip:</span> most users start with a
          &quot;Comment Auto-Reply&quot; to increase engagement on their latest posts.
        </p>
      </div>
    </div>
  );
}
