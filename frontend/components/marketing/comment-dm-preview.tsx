"use client";

import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

function AvatarRing({ className }: { className?: string }) {
  return (
    <span
      className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full instagram-gradient p-[2px] ${className ?? ""}`}
    >
      <span className="flex h-full w-full items-center justify-center rounded-full bg-white">
        <span className="h-[60%] w-[60%] rounded-full bg-surface-container-high" />
      </span>
    </span>
  );
}

export function CommentToDmPreview({ className }: { className?: string }) {
  const commentRef = useScrollReveal<HTMLDivElement>();
  const triggerRef = useScrollReveal<HTMLDivElement>();
  const dmRef = useScrollReveal<HTMLDivElement>();

  return (
    <div className={cn("relative mx-auto w-full max-w-sm lg:mx-0", className)}>
      <div className="absolute -inset-6 rounded-[3rem] instagram-gradient opacity-20 blur-3xl" />

      <div className="relative rotate-2 rounded-[2rem] border border-line bg-white p-5 shadow-2xl transition-transform duration-500 hover:rotate-0">
        <div className="flex items-center gap-2.5 border-b border-line pb-4">
          <AvatarRing />
          <div className="min-w-0">
            <p className="font-mono text-[11px] font-medium text-ink">@creator.jane</p>
            <p className="font-mono text-[10px] text-on-surface-variant">Original post · 2m</p>
          </div>
        </div>

        <div className="mt-4 flex h-32 items-center justify-center rounded-xl bg-surface-container-low">
          <Icon name="image" className="text-on-surface-variant/40 text-4xl" />
        </div>

        <div ref={commentRef} className="mt-5 flex items-start gap-2.5">
          <AvatarRing className="h-7 w-7" />
          <div className="min-w-0 rounded-2xl rounded-tl-sm bg-surface-container-low px-3 py-2">
            <p className="font-mono text-[11px] font-medium text-ink">@alex.codes</p>
            <p className="text-body-md text-on-surface">
              This 🔥🔥 send me{" "}
              <span className="rounded bg-violet/10 px-1 py-0.5 font-mono text-[11px] font-medium text-violet">
                info
              </span>
            </p>
          </div>
        </div>

        <div
          ref={triggerRef}
          className="delay-150 mt-3 flex items-center justify-center gap-1.5 text-violet"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-violet" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em]">
            Automated reply sent
          </span>
        </div>

        <div ref={dmRef} className="delay-300 mt-3 flex items-start justify-end gap-2.5">
          <div className="min-w-0 rounded-2xl rounded-tr-sm bg-ink px-3 py-2 text-right">
            <p className="text-body-md text-white">
              Hey Alex! Here&apos;s the info 🎉
              <br />
              nudgedm.com/link
            </p>
            <p className="mt-1 font-mono text-[10px] text-white/50">Sent · now</p>
          </div>
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full instagram-gradient">
            <Icon name="bolt" filled className="text-[16px] text-white" />
          </span>
        </div>
      </div>
    </div>
  );
}
