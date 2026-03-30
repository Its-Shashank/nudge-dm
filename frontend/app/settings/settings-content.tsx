'use client'

import React, { useState } from 'react'
import { User, CreditCard, FileText, Shield, Mail, ChevronRight, Edit, RefreshCw, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'

export default function SettingsContent() {
  const [fullName, setFullName] = useState('Elena Rodriguez')
  const [email, setEmail] = useState('elena@commentflow.io')
  const [instagramHandle] = useState('@creator_handle')
  const [lastSync] = useState('12 minutes ago')

  return (
    <div className="h-full overflow-auto" data-testid="settings-page">
      <div className="max-w-6xl mx-auto p-8 space-y-8">
        {/* Page Header */}
        <div>
          <p className="text-sm text-on-surface-variant font-medium mb-2">CONFIGURATION</p>
          <h1 className="text-4xl font-display font-bold text-on-surface mb-2">Workspace Configuration</h1>
          <p className="text-on-surface-variant">
            Manage your account identity, platform connections, and billing preferences from a centralized command center.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Account Identity Section */}
            <div className="surface-container-lowest rounded-2xl p-6 border-t-4 border-[hsl(var(--primary))]">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-[hsl(var(--primary)_/_0.1)]">
                  <User className="w-5 h-5 text-[hsl(var(--primary))]" />
                </div>
                <h2 className="text-xl font-display font-semibold text-on-surface">Account Identity</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-xs font-medium text-on-surface-variant uppercase mb-2">
                    Full Name
                  </label>
                  <Input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="surface-container-low"
                    data-testid="full-name-input"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-on-surface-variant uppercase mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="surface-container-low"
                    data-testid="email-input"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="gradient-primary text-white" data-testid="update-identity-button">
                  Update Identity
                </Button>
              </div>
            </div>

            {/* Subscription & Billing Section */}
            <div className="surface-container-lowest rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[hsl(var(--primary)_/_0.1)]">
                    <CreditCard className="w-5 h-5 text-[hsl(var(--primary))]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-display font-semibold text-on-surface">Subscription & Billing</h2>
                    <p className="text-sm text-on-surface-variant">Currently on the <span className="text-[hsl(var(--primary))] font-medium">Pro Professional Plan</span></p>
                  </div>
                </div>
                <Button variant="outline" size="sm" data-testid="view-invoices-button">
                  View Invoices
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-xl surface-container-low">
                  <p className="text-xs text-on-surface-variant uppercase mb-2">Monthly Spend</p>
                  <p className="text-3xl font-display font-bold text-[hsl(var(--primary))]">$49.00</p>
                  <p className="text-xs text-on-surface-variant mt-1">Next charge: Oct 12, 2024</p>
                </div>
                <div className="p-4 rounded-xl surface-container-low">
                  <p className="text-xs text-on-surface-variant uppercase mb-2">Seat Usage</p>
                  <p className="text-3xl font-display font-bold text-on-surface">08 / 12</p>
                  <div className="w-full h-1.5 rounded-full surface-container mt-2">
                    <div className="h-full rounded-full bg-[hsl(var(--primary))]" style={{ width: '66%' }} />
                  </div>
                </div>
                <div className="p-4 rounded-xl surface-container-low">
                  <p className="text-xs text-on-surface-variant uppercase mb-2">API Credits</p>
                  <p className="text-3xl font-display font-bold text-on-surface">92%</p>
                  <p className="text-xs text-[hsl(var(--success))] mt-1">Healthy utilization</p>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="flex items-center justify-between p-4 rounded-xl surface-container-low">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg surface-container-high">
                    <CreditCard className="w-5 h-5 text-on-surface" />
                  </div>
                  <div>
                    <p className="font-medium text-on-surface">Visa ending in 4242</p>
                    <p className="text-sm text-on-surface-variant">Expires 12/26</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Right Sidebar Column */}
          <div className="space-y-6">
            {/* Instagram Connection Card */}
            <div className="surface-container-lowest rounded-2xl p-6">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <Avatar className="w-24 h-24 border-4 border-[hsl(var(--surface-container-lowest))] shadow-lg">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=creator" />
                    <AvatarFallback>CR</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[hsl(var(--success))] border-4 border-[hsl(var(--surface-container-lowest))] flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="text-center mb-6">
                <h3 className="text-lg font-display font-semibold text-on-surface mb-1">Instagram Connected</h3>
                <p className="text-sm text-on-surface-variant mb-1">
                  Synced with <span className="text-[hsl(var(--primary))] font-medium">{instagramHandle}</span>
                </p>
                <p className="text-xs text-on-surface-variant">Last activity was {lastSync}.</p>
              </div>

              <div className="space-y-2">
                <Button className="w-full gradient-primary text-white" data-testid="refresh-sync-button">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh Sync
                </Button>
                <Button variant="outline" className="w-full text-[hsl(var(--error))] hover:bg-[hsl(var(--error)_/_0.1)]" data-testid="disconnect-button">
                  <XCircle className="w-4 h-4 mr-2" />
                  Disconnect Platform
                </Button>
              </div>
            </div>

            {/* Support Center */}
            <div className="surface-container-lowest rounded-2xl p-6">
              <p className="text-xs text-on-surface-variant font-medium uppercase mb-4">Support Center</p>
              <div className="space-y-2">
                <button className="w-full flex items-center justify-between p-3 rounded-lg hover:surface-container-low transition-colors text-left">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-on-surface-variant" />
                    <span className="text-sm font-medium text-on-surface">Documentation</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-on-surface-variant" />
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-lg hover:surface-container-low transition-colors text-left">
                  <div className="flex items-center gap-3">
                    <Shield className="w-4 h-4 text-on-surface-variant" />
                    <span className="text-sm font-medium text-on-surface">Security Audit</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-on-surface-variant" />
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-lg hover:surface-container-low transition-colors text-left">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-on-surface-variant" />
                    <span className="text-sm font-medium text-on-surface">Contact Expert</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-on-surface-variant" />
                </button>
              </div>
            </div>

            {/* New API Version Card */}
            <div className="surface-container-lowest rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                <svg viewBox="0 0 100 100" fill="currentColor" className="text-[hsl(var(--primary))]">
                  <circle cx="50" cy="50" r="40" />
                </svg>
              </div>
              <div className="relative z-10">
                <p className="text-sm font-semibold text-on-surface mb-1">New API Version</p>
                <p className="text-xs text-on-surface-variant mb-4">Upgrade to v4.2 for better performance</p>
                <Button size="sm" variant="outline" className="text-xs">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
