'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { MessageSquare, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export default function MessageContent() {
  const [template, setTemplate] = useState(`Hey {{first_name}}, we noticed you left something behind! Here's a 10% discount to help you finish your purchase.`)

  return (
    <div className="h-full overflow-auto">
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-sm text-on-surface-variant font-medium mb-2">STEP 2 OF 4</p>
            <h1 className="text-3xl font-display font-bold text-on-surface mb-2">Message & Personalization</h1>
            <p className="text-on-surface-variant">Craft your automated response with dynamic variables.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <div className="surface-container-lowest rounded-2xl p-6 border-l-4 border-[hsl(var(--primary))]">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg gradient-primary">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-display font-semibold text-on-surface">Dynamic Template</h2>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[hsl(var(--success)_/_0.1)]">
                <Sparkles className="w-4 h-4 text-[hsl(var(--success))]" />
                <span className="text-xs font-medium text-[hsl(var(--success))]">AI ASSISTANT ACTIVE</span>
              </div>
            </div>

            <Textarea
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              className="min-h-[200px] surface-container-low font-body"
              placeholder="Write your message template..."
            />

            <div className="flex items-center gap-2 mt-4 flex-wrap">
              <p className="text-xs text-on-surface-variant">Available variables:</p>
              {['#first_name', '#product_name', '#cart_total'].map((variable) => (
                <button
                  key={variable}
                  className="px-2.5 py-1 rounded-md text-xs font-medium bg-[hsl(var(--primary)_/_0.1)] text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary)_/_0.2)] transition-colors"
                >
                  {variable}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between gap-3">
            <Link href="/campaigns/create/trigger">
              <Button variant="outline">Back</Button>
            </Link>
            <Link href="/campaigns/create/conversion">
              <Button className="gradient-primary text-white">
                Next: Conversion Link
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
