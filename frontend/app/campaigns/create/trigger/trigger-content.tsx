'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Zap, Clock, ChevronDown, Smartphone, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function TriggerContent() {
  const [eventSource, setEventSource] = useState('Cart Abandonment')
  const [condition, setCondition] = useState('Wait 2 Hours')

  return (
    <div className="h-full overflow-auto" data-testid="create-campaign-trigger">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-sm text-on-surface-variant font-medium mb-2">CREATE NEW CAMPAIGN</p>
            <h1 className="text-3xl font-display font-bold text-on-surface mb-2">Monday Surge Flow</h1>
            <p className="text-on-surface-variant">Automated re-engagement sequence for high-value segments.</p>
          </div>
          <Button variant="outline" data-testid="launch-campaign-button">
            Launch Campaign
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Step 1: The Trigger */}
            <div className="surface-container-lowest rounded-2xl p-6 border-l-4 border-[hsl(var(--primary))]">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-lg gradient-primary">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-display font-semibold text-on-surface">Step 1: The Trigger</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-medium text-on-surface-variant uppercase mb-3">
                    Event Source
                  </label>
                  <div className="relative">
                    <button className="w-full flex items-center justify-between p-4 rounded-xl surface-container-low hover:surface-container transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-[hsl(var(--primary)_/_0.1)]">
                          <svg className="w-4 h-4 text-[hsl(var(--primary))]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        <span className="font-medium text-on-surface">{eventSource}</span>
                      </div>
                      <ChevronDown className="w-4 h-4 text-on-surface-variant" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-on-surface-variant uppercase mb-3">
                    Condition
                  </label>
                  <div className="relative">
                    <button className="w-full flex items-center justify-between p-4 rounded-xl surface-container-low hover:surface-container transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-[hsl(var(--primary)_/_0.1)]">
                          <Clock className="w-4 h-4 text-[hsl(var(--primary))]" />
                        </div>
                        <span className="font-medium text-on-surface">{condition}</span>
                      </div>
                      <ChevronDown className="w-4 h-4 text-on-surface-variant" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-end gap-3">
              <Link href="/campaigns">
                <Button variant="outline">Cancel</Button>
              </Link>
              <Link href="/campaigns/create/message">
                <Button className="gradient-primary text-white" data-testid="next-step-button">
                  Next: Message & Personalization
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column - Live Preview */}
          <div>
            <div className="sticky top-8">
              <p className="text-xs text-on-surface-variant font-medium uppercase mb-4">Live Mobile Preview</p>
              <div className="relative">
                {/* Phone Frame */}
                <div className="mx-auto w-[300px] h-[600px] rounded-[3rem] border-8 border-[hsl(var(--outline-variant))] surface-container-lowest overflow-hidden shadow-2xl">
                  <div className="h-full p-4 surface-dim">
                    {/* Mock DM */}
                    <div className="bg-[hsl(var(--primary))] rounded-2xl p-4 mb-4 max-w-[85%]">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-xs font-medium text-white">CommentFlow Bot</span>
                      </div>
                      <p className="text-sm text-white leading-relaxed">
                        Hey Sarah, we noticed you left something behind! Here's a 10% discount to help you finish your purchase.
                      </p>
                    </div>

                    {/* Product Card */}
                    <div className="surface-container-lowest rounded-2xl p-4 mb-4">
                      <div className="aspect-video bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--primary-container))] rounded-xl mb-3" />
                      <div className="mb-3">
                        <p className="text-xs text-on-surface-variant mb-1">YOUR CART</p>
                        <p className="font-semibold text-on-surface">Classic Chronograph</p>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-lg font-display font-bold text-[hsl(var(--primary))]">$189.00</span>
                          <span className="text-xs text-[hsl(var(--success))]">-10% APPLIED</span>
                        </div>
                      </div>
                      <Button className="w-full gradient-primary text-white" size="sm">
                        Complete Checkout
                      </Button>
                    </div>

                    {/* Device Info */}
                    <div className="flex items-center justify-center gap-2 mt-6">
                      <Smartphone className="w-4 h-4 text-on-surface-variant" />
                      <span className="text-xs text-on-surface-variant">iPhone 15 Pro</span>
                      <div className="flex items-center gap-1 px-2 py-1 rounded-full surface-container">
                        <Check className="w-3 h-3 text-[hsl(var(--success))]" />
                        <span className="text-xs text-[hsl(var(--success))]">Optimized</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
