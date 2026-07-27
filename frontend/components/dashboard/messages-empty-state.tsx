import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

export function MessagesEmptyState() {
  return (
    <div className="mx-auto w-full max-w-md text-center">
      <div className="relative mx-auto flex h-32 w-32 items-center justify-center">
        <div className="absolute inset-0 -z-10 scale-150 rounded-full bg-violet/5 blur-3xl" />
        <div className="relative flex h-32 w-32 items-center justify-center rounded-3xl border border-line bg-white shadow-xl">
          <Icon name="chat_bubble" className="text-5xl text-violet/20" />
        </div>
      </div>

      <div className="mt-8 space-y-3">
        <h1 className="text-headline-lg text-ink">Your inbox is empty</h1>
        <p className="text-body-lg text-on-surface-variant">
          Once your automations start sending DMs, you&apos;ll see the conversation history here.
        </p>
      </div>

      <div className="mt-8">
        <Link href="/dashboard/automations">
          <Button type="button" size="lg" className="shadow-xl hover:scale-[1.03]">
            <Icon name="bolt" />
            Go to Automations
          </Button>
        </Link>
      </div>

      <div className="mt-12 flex items-start gap-3 rounded-2xl border border-line bg-white p-5 text-left opacity-70 transition-opacity hover:opacity-100">
        <div className="rounded-lg bg-violet/10 p-2">
          <Icon name="info" className="text-violet" />
        </div>
        <div>
          <h3 className="text-label-md font-semibold text-ink">Pro tip</h3>
          <p className="mt-1 text-body-md text-on-surface-variant">
            Sync your Instagram account in Connections to start building your first engagement
            workflow.
          </p>
        </div>
      </div>
    </div>
  );
}
