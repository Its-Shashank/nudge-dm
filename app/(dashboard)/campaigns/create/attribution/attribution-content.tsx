'use client'

import React from 'react'
import Link from 'next/link'
import { DollarSign, TrendingUp, Target, Save, Rocket } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function AttributionContent() {
  return (
    <div className="h-full overflow-auto">
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-sm text-on-surface-variant font-medium mb-2">STEP 4 OF 4</p>
            <h1 className="text-3xl font-display font-bold text-on-surface mb-2">Revenue Attribution</h1>
            <p className="text-on-surface-variant">Review projected metrics and launch your campaign.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <div className="surface-container-lowest rounded-2xl p-6 border-l-4 border-[hsl(var(--primary))]">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-lg gradient-primary">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-display font-semibold text-on-surface">Projected Performance</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl surface-container-low">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-[hsl(var(--success))]" />
                  <p className="text-xs text-on-surface-variant uppercase">Projected Lift</p>
                </div>
                <p className="text-4xl font-display font-bold text-[hsl(var(--success))]">+24.8%</p>
              </div>

              <div className="p-6 rounded-xl surface-container-low">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-5 h-5 text-[hsl(var(--primary))]" />
                  <p className="text-xs text-on-surface-variant uppercase">Target</p>
                </div>
                <p className="text-4xl font-display font-bold text-on-surface">$12,500</p>
              </div>

              <div className="p-6 rounded-xl surface-container-low">
                <div className="flex items-center gap-2 mb-3">
                  <DollarSign className="w-5 h-5 text-[hsl(var(--warning))]" />
                  <p className="text-xs text-on-surface-variant uppercase">Avg ROAS</p>
                </div>
                <p className="text-4xl font-display font-bold text-on-surface">4.2x</p>
              </div>
            </div>
          </div>

          <div className="flex justify-between gap-3">
            <Link href="/campaigns/create/conversion">
              <Button variant="outline">Back</Button>
            </Link>
            <div className="flex gap-3">
              <Button variant="outline" className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save Draft
              </Button>
              <Link href="/campaigns">
                <Button className="gradient-primary text-white flex items-center gap-2">
                  <Rocket className="w-4 h-4" />
                  Deploy Flow
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
