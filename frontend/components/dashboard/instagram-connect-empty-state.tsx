import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { INSTAGRAM_CONNECT_FEATURES } from "@/lib/constants/dashboard";

export function InstagramConnectEmptyState() {
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
            <Icon name="photo_camera" className="text-5xl text-on-surface-variant/40" />
            <span className="absolute -bottom-2 -right-2 flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white shadow-lg">
              <Icon name="link_off" filled className="text-2xl text-error" />
            </span>
          </div>
        </div>

        <div className="mt-8 space-y-3">
          <h1 className="text-headline-lg text-ink">Instagram not connected</h1>
          <p className="text-body-lg text-on-surface-variant">
            Connect your professional Instagram account to start building powerful
            automations and growing your community.
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4">
          <a href="/api/instagram/connect">
            <Button type="button" size="lg" className="shadow-xl hover:scale-[1.03]">
              <Icon name="add_link" />
              Connect Instagram
            </Button>
          </a>

          <Link
            href="#"
            className="inline-flex items-center gap-1 text-label-sm text-on-surface-variant transition-colors hover:text-violet"
          >
            <Icon name="help_outline" className="shrink-0 text-[15px]" />
            <span className="underline underline-offset-4">Why do I need to connect?</span>
          </Link>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-4 text-left opacity-70 sm:grid-cols-3">
        {INSTAGRAM_CONNECT_FEATURES.map((feature) => (
          <div
            key={feature.title}
            className="space-y-2 rounded-2xl border border-line bg-white p-5"
          >
            <Icon name={feature.icon} className="text-violet" />
            <h3 className="text-label-md font-semibold text-ink">{feature.title}</h3>
            <p className="text-body-md text-on-surface-variant">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
