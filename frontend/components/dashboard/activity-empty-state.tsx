import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

export function ActivityEmptyState() {
  return (
    <div className="mx-auto w-full max-w-2xl text-center">
      <div className="mx-auto max-w-md">
        <div className="relative mx-auto flex h-48 w-48 items-center justify-center">
          <div className="absolute inset-0 -z-10 scale-150 rounded-full instagram-gradient opacity-10 blur-3xl" />

          <div
            className="absolute inset-0 rounded-[2.5rem] border-2 border-dashed border-line motion-safe:animate-spin"
            style={{ animationDuration: "20s" }}
          />

          <div className="relative flex h-32 w-32 items-center justify-center rounded-3xl border border-line bg-white shadow-xl">
            <Icon name="insights" className="text-5xl text-on-surface-variant/40" />
            <span className="absolute -bottom-2 -right-2 flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white shadow-lg">
              <Icon name="hourglass_empty" filled className="text-2xl text-violet" />
            </span>
          </div>
        </div>

        <div className="mt-8 space-y-3">
          <h1 className="text-headline-lg text-ink">No activity recorded</h1>
          <p className="text-body-lg text-on-surface-variant">
            Your recent automation activity and engagement stats will appear here as they
            happen. Start a workflow to see the impact.
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link href="/dashboard/automations">
            <Button type="button" size="lg" className="shadow-xl hover:scale-[1.03]">
              <Icon name="bolt" />
              View Automations
            </Button>
          </Link>
          <Link href="#">
            <Button type="button" variant="secondary" size="lg">
              Documentation
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-4 opacity-40 grayscale sm:grid-cols-3">
        {["Triggers This Month", "Messages Sent", "Avg. Reply Rate"].map((label) => (
          <div
            key={label}
            className="space-y-3 rounded-2xl border border-line bg-white p-5 text-left"
          >
            <p className="text-label-sm text-on-surface-variant">{label}</p>
            <div className="h-6 w-2/3 rounded bg-surface-container-high" />
          </div>
        ))}
      </div>
    </div>
  );
}
