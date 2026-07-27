import { Icon } from "@/components/ui/icon";
import { AUTOMATION_TIPS } from "@/lib/constants/dashboard";

export function AutomationTips() {
  return (
    <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
      {AUTOMATION_TIPS.map((tip) => (
        <div key={tip.title} className="flex flex-col gap-2 rounded-2xl border border-line bg-white p-5">
          <Icon name={tip.icon} className="text-[28px] text-violet" />
          <h3 className="text-label-md font-semibold text-ink">{tip.title}</h3>
          <p className="text-body-md text-on-surface-variant">{tip.description}</p>
        </div>
      ))}
    </div>
  );
}
