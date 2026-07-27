"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AutomationDelayCard } from "./automation-delay-card";
import { AutomationDmPreview } from "./automation-dm-preview";
import { AutomationKeywordsCard } from "./automation-keywords-card";
import { AutomationMessageCard } from "./automation-message-card";
import { AutomationNameCard } from "./automation-name-card";
import { AutomationStatusCard } from "./automation-status-card";
import { AutomationTriggerCard } from "./automation-trigger-card";
import { CreateAutomationActionsBar } from "./create-automation-actions-bar";
import { DEFAULT_AUTOMATION_DRAFT } from "@/lib/constants/dashboard";
import type { AutomationDraft } from "@/types/automation";

export function CreateAutomationView() {
  const router = useRouter();
  const [draft, setDraft] = useState<AutomationDraft>(DEFAULT_AUTOMATION_DRAFT);

  function updateDraft<K extends keyof AutomationDraft>(key: K, value: AutomationDraft[K]) {
    setDraft((prev) => ({ ...prev, [key]: value }));
  }

  function handleAddKeyword(keyword: string) {
    const normalized = keyword.trim().toUpperCase();
    if (!normalized || draft.keywords.includes(normalized)) return;
    updateDraft("keywords", [...draft.keywords, normalized]);
  }

  function handleRemoveKeyword(keyword: string) {
    updateDraft("keywords", draft.keywords.filter((k) => k !== keyword));
  }

  function handleDiscard() {
    if (window.confirm("Discard all changes to this automation?")) {
      setDraft(DEFAULT_AUTOMATION_DRAFT);
    }
  }

  function handleCancel() {
    router.push("/dashboard/automations");
  }

  function handleSave() {
    router.push("/dashboard/automations");
  }

  return (
    <div className="pb-28">
      <div className="mb-8">
        <h1 className="text-headline-lg text-ink">Create Automation</h1>
        <p className="mt-1 text-body-md text-on-surface-variant">
          Set up a new Instagram engagement workflow.
        </p>
      </div>

      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        <div className="flex w-full flex-col gap-6 md:w-[60%]">
          <AutomationNameCard name={draft.name} onNameChange={(value) => updateDraft("name", value)} />
          <AutomationTriggerCard trigger={draft.trigger} />
          <AutomationKeywordsCard
            keywords={draft.keywords}
            onAddKeyword={handleAddKeyword}
            onRemoveKeyword={handleRemoveKeyword}
          />
          <AutomationMessageCard
            message={draft.message}
            onMessageChange={(value) => updateDraft("message", value)}
          />
          <AutomationDelayCard delay={draft.delay} onDelayChange={(value) => updateDraft("delay", value)} />
          <AutomationStatusCard
            enabled={draft.enabled}
            onEnabledChange={(value) => updateDraft("enabled", value)}
          />
        </div>

        <div className="hidden w-full md:flex md:w-[40%]">
          <AutomationDmPreview message={draft.message} />
        </div>
      </div>

      <CreateAutomationActionsBar
        onDiscard={handleDiscard}
        onCancel={handleCancel}
        onSave={handleSave}
      />
    </div>
  );
}
