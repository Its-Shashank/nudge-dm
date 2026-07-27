"use client";

import { useState, type KeyboardEvent } from "react";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";

export interface AutomationKeywordsCardProps {
  keywords: string[];
  onAddKeyword: (keyword: string) => void;
  onRemoveKeyword: (keyword: string) => void;
}

export function AutomationKeywordsCard({
  keywords,
  onAddKeyword,
  onRemoveKeyword,
}: AutomationKeywordsCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [draft, setDraft] = useState("");

  function commitDraft() {
    const value = draft.trim();
    if (value) onAddKeyword(value);
    setDraft("");
    setIsAdding(false);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      commitDraft();
    } else if (e.key === "Escape") {
      setDraft("");
      setIsAdding(false);
    }
  }

  return (
    <div className="rounded-2xl border border-line bg-white p-6">
      <label className="mb-3 block font-mono text-[11px] uppercase tracking-[0.1em] text-on-surface-variant">
        Keyword Filter
      </label>
      <p className="text-body-md text-on-surface-variant">
        Only trigger if comment contains one of these words:
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {keywords.map((keyword) => (
          <span
            key={keyword}
            className="inline-flex items-center gap-1.5 rounded-full bg-violet/10 px-3 py-1.5 text-label-md text-violet"
          >
            {keyword}
            <button
              type="button"
              aria-label={`Remove keyword ${keyword}`}
              onClick={() => onRemoveKeyword(keyword)}
              className="rounded-full hover:text-ink"
            >
              <Icon name="close" className="text-[14px]" />
            </button>
          </span>
        ))}

        {isAdding ? (
          <Input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={commitDraft}
            placeholder="Type keyword..."
            className="w-36 rounded-full px-3 py-1.5 text-label-md"
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-1 rounded-full border border-dashed border-line px-3 py-1.5 text-label-md text-on-surface-variant transition-all hover:border-violet hover:text-violet"
          >
            <Icon name="add" className="text-[14px]" /> Add keyword
          </button>
        )}
      </div>
    </div>
  );
}
