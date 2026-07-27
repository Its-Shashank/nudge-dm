import { Icon } from "@/components/ui/icon";

export interface AutomationDmPreviewProps {
  message: string;
}

export function AutomationDmPreview({ message }: AutomationDmPreviewProps) {
  return (
    <div className="sticky top-24 mx-auto w-full max-w-[300px]">
      <div className="relative h-[600px] overflow-hidden rounded-[3rem] border-[8px] border-ink bg-black shadow-2xl">
        <div className="absolute top-0 left-1/2 z-10 flex h-6 w-32 -translate-x-1/2 items-center justify-center rounded-b-2xl bg-ink">
          <div className="h-1 w-12 rounded-full bg-white/30" />
        </div>

        <div className="absolute top-0 flex h-14 w-full items-center gap-2.5 border-b border-line bg-white px-4 pt-4">
          <Icon name="arrow_back" className="text-xl text-ink" />
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full instagram-gradient p-[2px]">
            <span className="flex h-full w-full items-center justify-center rounded-full bg-white">
              <span className="h-[60%] w-[60%] rounded-full bg-surface-container-high" />
            </span>
          </span>
          <div className="min-w-0">
            <p className="text-[11px] font-bold leading-none text-ink">Your Brand</p>
            <p className="text-[10px] text-on-surface-variant">Active now</p>
          </div>
        </div>

        <div className="flex h-full flex-col justify-end overflow-y-auto bg-white p-4 pt-14 pb-14">
          <div className="mb-4 flex justify-end">
            <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-ink px-3 py-2 text-sm text-white">
              {message || "Type your message in the configuration panel to see a live preview..."}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 flex h-14 w-full items-center gap-2 border-t border-line bg-white px-4">
          <div className="flex h-10 flex-grow items-center rounded-full border border-line px-4">
            <span className="text-sm text-on-surface-variant/60">Message...</span>
          </div>
          <Icon name="mic" filled className="text-violet" />
          <Icon name="image" filled className="text-violet" />
        </div>
      </div>
    </div>
  );
}
