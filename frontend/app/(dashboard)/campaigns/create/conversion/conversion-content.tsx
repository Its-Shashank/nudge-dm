'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Link as LinkIcon, Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function ConversionContent() {
  const [url, setUrl] = useState('https://store.flow/checkout?ref=cart_recovery_h1')
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="h-full overflow-auto">
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-sm text-on-surface-variant font-medium mb-2">STEP 3 OF 4</p>
            <h1 className="text-3xl font-display font-bold text-on-surface mb-2">Conversion Link</h1>
            <p className="text-on-surface-variant">Set up your tracking URL for attribution.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <div className="surface-container-lowest rounded-2xl p-6 border-l-4 border-[hsl(var(--primary))]">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-lg gradient-primary">
                <LinkIcon className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-display font-semibold text-on-surface">Tracking URL</h2>
            </div>

            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="surface-container-low"
                  placeholder="Enter your conversion URL..."
                />
              </div>
              <Button
                variant="outline"
                onClick={handleCopy}
                className="flex-shrink-0"
              >
                {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </div>

            <p className="text-sm text-on-surface-variant mt-4">
              This URL will be shortened and tracked for click attribution.
            </p>
          </div>

          <div className="flex justify-between gap-3">
            <Link href="/campaigns/create/message">
              <Button variant="outline">Back</Button>
            </Link>
            <Link href="/campaigns/create/attribution">
              <Button className="gradient-primary text-white">
                Next: Revenue Attribution
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
