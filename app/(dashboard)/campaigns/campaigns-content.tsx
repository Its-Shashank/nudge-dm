'use client'

import React from 'react'
import Link from 'next/link'
import { Plus, Filter, ArrowUpDown, TrendingUp, MoreVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getDashboardMetrics, getCampaigns } from '@/lib/mockData'

export default function CampaignsContent() {
  const metrics = getDashboardMetrics()
  const campaigns = getCampaigns()

  return (
    <div className="h-full overflow-auto" data-testid="campaigns-page">
      <div className="max-w-7xl mx-auto p-8 space-y-6">
        {/* Page Header */}
        <div>
          <p className="text-sm text-on-surface-variant font-medium mb-2">MARKETING ENGINE</p>
          <h1 className="text-4xl font-display font-bold text-on-surface mb-2">Campaigns</h1>
          <p className="text-on-surface-variant">
            Manage and monitor your automated engagement campaigns across all social platforms.
          </p>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl gradient-primary text-white relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-sm text-white/80 mb-2">TOTAL ACTIVE REVENUE</p>
              <h2 className="text-4xl font-display font-bold mb-2">
                ${metrics.total_active_revenue.toLocaleString()}
              </h2>
              <div className="flex items-center gap-1.5 text-sm">
                <TrendingUp className="w-4 h-4" />
                <span className="font-medium">+{metrics.revenue_change}%</span>
                <span className="text-white/70">this month</span>
              </div>
            </div>
            <div className="absolute right-0 top-0 w-32 h-32 opacity-10">
              <svg viewBox="0 0 100 100" fill="currentColor">
                <path d="M10 50 L30 30 L50 40 L70 20 L90 30 L90 90 L10 90 Z" />
              </svg>
            </div>
          </div>

          <div className="p-6 rounded-2xl surface-container-lowest">
            <p className="text-sm text-on-surface-variant mb-2">LIVE CAMPAIGNS</p>
            <h2 className="text-4xl font-display font-bold text-on-surface mb-1">
              {metrics.live_campaigns}
            </h2>
            <p className="text-sm text-on-surface-variant">
              {metrics.pending_campaigns} Pending approval
            </p>
          </div>

          <div className="p-6 rounded-2xl surface-container-lowest">
            <p className="text-sm text-on-surface-variant mb-2">AVG. CONVERSION</p>
            <h2 className="text-4xl font-display font-bold text-on-surface mb-1">
              {metrics.avg_conversion}%
            </h2>
            <div className="w-full h-1.5 rounded-full surface-container mt-3">
              <div 
                className="h-full rounded-full bg-[hsl(var(--warning))]"
                style={{ width: `${metrics.avg_conversion}%` }}
              />
            </div>
          </div>
        </div>

        {/* Active Campaigns Table */}
        <div className="surface-container-lowest rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-display font-semibold text-on-surface">Active Campaigns</h2>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" data-testid="filter-button">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm" data-testid="sort-button">
                <ArrowUpDown className="w-4 h-4 mr-2" />
                Sort
              </Button>
              <Link href="/campaigns/create/trigger">
                <Button className="gradient-primary text-white" data-testid="create-campaign-button">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Campaign
                </Button>
              </Link>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full" data-testid="campaigns-table">
              <thead>
                <tr className="border-b border-[hsl(var(--outline-variant)_/_0.15)]">
                  <th className="text-left py-3 px-4 text-xs font-medium text-on-surface-variant uppercase tracking-wider">
                    Campaign Name
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-on-surface-variant uppercase tracking-wider">
                    Keyword
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-on-surface-variant uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-on-surface-variant uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-on-surface-variant uppercase tracking-wider">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-on-surface-variant uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((campaign, index) => (
                  <tr
                    key={campaign.id}
                    data-testid={`campaign-row-${index}`}
                    className="border-b border-[hsl(var(--outline-variant)_/_0.08)] hover:surface-container-low transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${campaign.name}`} />
                          <AvatarFallback>{campaign.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-on-surface">{campaign.name}</p>
                          <p className="text-xs text-on-surface-variant">{campaign.platform}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-[hsl(var(--primary)_/_0.1)] text-[hsl(var(--primary))]">
                        #{campaign.keyword}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          campaign.status === 'Active'
                            ? 'bg-[hsl(var(--success))] status-active'
                            : campaign.status === 'Scheduled'
                            ? 'bg-[hsl(var(--warning))]'
                            : 'bg-[hsl(var(--outline-variant))]'
                        }`} />
                        <span className="text-sm text-on-surface">{campaign.status}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-display font-semibold text-on-surface">
                        ${campaign.revenue.toLocaleString()}
                      </p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-sm text-on-surface-variant">{campaign.date}</p>
                    </td>
                    <td className="py-4 px-4">
                      <Button variant="ghost" size="icon" data-testid={`campaign-actions-${index}`}>
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA Card */}
        <div className="rounded-2xl p-8 gradient-primary text-white relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <h3 className="text-2xl font-display font-bold mb-3">
              Want to double your conversions?
            </h3>
            <p className="text-white/90 mb-6">
              Our new "Multi-Trigger" feature allows you to set up multiple keywords for the same automated response sequence.
            </p>
            <Button className="bg-white text-[hsl(var(--primary))] hover:bg-white/90" data-testid="case-study-button">
              Read Case Study
            </Button>
          </div>
          <div className="absolute right-8 bottom-0 w-64 h-64 opacity-10">
            <svg viewBox="0 0 200 200" fill="currentColor">
              <path d="M50 100 Q 75 50, 100 75 T 150 100 Q 125 150, 100 125 T 50 100" />
              <circle cx="100" cy="100" r="60" opacity="0.3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
