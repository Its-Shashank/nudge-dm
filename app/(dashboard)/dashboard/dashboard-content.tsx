'use client'

import React from 'react'
import Link from 'next/link'
import { TrendingUp, DollarSign, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getDashboardMetrics, getCampaigns } from '@/lib/mockData'

export default function DashboardContent() {
  const metrics = getDashboardMetrics()
  const campaigns = getCampaigns().slice(0, 3)

  const statCards = [
    {
      title: 'Total Revenue',
      value: `$${metrics.total_active_revenue.toLocaleString()}`,
      change: `+${metrics.revenue_change}%`,
      changeLabel: 'from last month',
      icon: DollarSign,
      gradient: true
    },
    {
      title: 'Live Campaigns',
      value: metrics.live_campaigns,
      subtitle: `${metrics.pending_campaigns} pending approval`,
      icon: Target,
    },
    {
      title: 'Avg. Conversion',
      value: `${metrics.avg_conversion}%`,
      icon: TrendingUp,
    }
  ]

  return (
    <div className="h-full overflow-auto" data-testid="dashboard-page">
      <div className="max-w-7xl mx-auto p-8 space-y-8">
        {/* Page Header */}
        <div>
          <p className="text-sm text-on-surface-variant font-medium mb-2">OVERVIEW</p>
          <h1 className="text-4xl font-display font-bold text-on-surface mb-2">Dashboard</h1>
          <p className="text-on-surface-variant">Monitor your Instagram automation performance at a glance.</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statCards.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                data-testid={`metric-card-${index}`}
                className={`p-6 rounded-2xl ${
                  stat.gradient
                    ? 'gradient-primary text-white'
                    : 'surface-container-lowest'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${
                    stat.gradient
                      ? 'bg-white/20'
                      : 'surface-container-high'
                  }`}>
                    <Icon className={`w-5 h-5 ${stat.gradient ? 'text-white' : 'text-[hsl(var(--primary))]'}`} />
                  </div>
                </div>
                
                <p className={`text-sm font-medium mb-2 ${
                  stat.gradient ? 'text-white/80' : 'text-on-surface-variant'
                }`}>
                  {stat.title}
                </p>
                
                <p className={`text-3xl font-display font-bold mb-1 ${
                  stat.gradient ? 'text-white' : 'text-on-surface'
                }`}>
                  {stat.value}
                </p>
                
                {stat.change && (
                  <div className="flex items-center gap-1.5 text-sm">
                    <TrendingUp className={`w-4 h-4 ${stat.gradient ? 'text-white' : 'text-[hsl(var(--success))]'}`} />
                    <span className={`font-medium ${stat.gradient ? 'text-white' : 'text-[hsl(var(--success))]'}`}>
                      {stat.change}
                    </span>
                    <span className={stat.gradient ? 'text-white/70' : 'text-on-surface-variant'}>
                      {stat.changeLabel}
                    </span>
                  </div>
                )}
                
                {stat.subtitle && (
                  <p className="text-sm text-on-surface-variant mt-2">{stat.subtitle}</p>
                )}
              </div>
            )
          })}
        </div>

        {/* Recent Campaigns */}
        <div className="surface-container-lowest rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-display font-semibold text-on-surface mb-1">Recent Campaigns</h2>
              <p className="text-sm text-on-surface-variant">Your latest automated campaigns</p>
            </div>
            <Link href="/campaigns">
              <Button data-testid="view-all-campaigns-button" className="gradient-primary text-white">
                View All
              </Button>
            </Link>
          </div>

          <div className="space-y-4">
            {campaigns.map((campaign) => (
              <div
                key={campaign.id}
                data-testid={`campaign-item-${campaign.id}`}
                className="p-4 rounded-xl surface-container-low flex items-center justify-between hover:surface-container transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                    <span className="text-white font-display font-bold text-lg">
                      {campaign.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium text-on-surface">{campaign.name}</h3>
                    <p className="text-sm text-on-surface-variant">{campaign.platform}</p>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p className="text-sm text-on-surface-variant">Revenue</p>
                    <p className="font-display font-semibold text-on-surface">
                      ${campaign.revenue.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-on-surface-variant">DMs Sent</p>
                    <p className="font-display font-semibold text-on-surface">
                      {campaign.dms_sent.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                      campaign.status === 'Active'
                        ? 'bg-[hsl(var(--success)_/_0.1)] text-[hsl(var(--success))]'
                        : campaign.status === 'Scheduled'
                        ? 'bg-[hsl(var(--warning)_/_0.1)] text-[hsl(var(--warning))]'
                        : 'surface-container text-on-surface-variant'
                    }`}>
                      {campaign.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="surface-container-lowest rounded-2xl p-6">
            <h3 className="font-display font-semibold text-on-surface mb-2">Quick Start</h3>
            <p className="text-sm text-on-surface-variant mb-4">
              Create your first automated DM campaign in minutes
            </p>
            <Link href="/campaigns/create/trigger">
              <Button className="gradient-primary text-white" data-testid="create-campaign-button">
                Create New Campaign
              </Button>
            </Link>
          </div>

          <div className="surface-container-lowest rounded-2xl p-6">
            <h3 className="font-display font-semibold text-on-surface mb-2">Performance Insights</h3>
            <p className="text-sm text-on-surface-variant mb-4">
              View detailed analytics and optimization suggestions
            </p>
            <Link href="/analytics">
              <Button variant="outline" data-testid="view-analytics-button">
                View Analytics
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
