import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SettingsProfileTab() {
  return (
    <div className="rounded-2xl border border-line bg-white p-6 shadow-xl">
      <h2 className="text-headline-md text-ink mb-6">Profile Information</h2>

      <div className="grid max-w-lg grid-cols-1 gap-5">
        <div>
          <label
            htmlFor="settings_full_name"
            className="mb-2 block font-mono text-[11px] uppercase tracking-[0.1em] text-on-surface-variant"
          >
            Full Name
          </label>
          <Input id="settings_full_name" type="text" defaultValue="Jane Doe" disabled />
        </div>

        <div>
          <label
            htmlFor="settings_email"
            className="mb-2 block font-mono text-[11px] uppercase tracking-[0.1em] text-on-surface-variant"
          >
            Email Address
          </label>
          <Input
            id="settings_email"
            type="email"
            defaultValue="jane@example.com"
            disabled
          />
        </div>

        <div className="pt-2">
          <Button type="button" disabled>
            Save Changes
          </Button>
          <p className="mt-2 text-body-md text-on-surface-variant">
            Profile editing isn&apos;t available yet — check back soon.
          </p>
        </div>
      </div>
    </div>
  );
}
