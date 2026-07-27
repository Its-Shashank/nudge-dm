"use client";

import { Tabs } from "@/components/ui/tabs";
import { SettingsProfileTab } from "./settings-profile-tab";
import { SettingsInstagramTab } from "./settings-instagram-tab";
import { SettingsBillingTab } from "./settings-billing-tab";
import { SettingsDangerZoneTab } from "./settings-danger-zone-tab";

const SETTINGS_TABS = [
  { id: "profile", label: "Profile" },
  { id: "instagram", label: "Instagram" },
  { id: "billing", label: "Billing" },
  { id: "danger", label: "Danger Zone" },
];

export function SettingsView() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <h1 className="text-headline-lg text-ink">Settings</h1>
        <p className="mt-1 text-body-md text-on-surface-variant">
          Manage your account preferences and integrations.
        </p>
      </div>

      <Tabs tabs={SETTINGS_TABS}>
        {(activeTabId) => {
          switch (activeTabId) {
            case "profile":
              return <SettingsProfileTab />;
            case "instagram":
              return <SettingsInstagramTab />;
            case "billing":
              return <SettingsBillingTab />;
            case "danger":
              return <SettingsDangerZoneTab />;
            default:
              return null;
          }
        }}
      </Tabs>
    </div>
  );
}
