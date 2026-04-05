'use client'

import React, { useState } from 'react'
import { 
  TrendingUp, 
  Key, 
  AlertTriangle,
  Mail,
  Share2,
  Download,
  MoreVertical
} from 'lucide-react'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { getAnalyticsSummary, generateRevenueData, getInsights, getContent } from '@/lib/mockData'
import type { Content } from '@/types'

export default function AnalyticsContent() {
  const [selectedPeriod, setSelectedPeriod] = useState('7days')
  const summary = getAnalyticsSummary()
  const revenueData = generateRevenueData(selectedPeriod)
  const insights = getInsights()
  const content = getContent()

  const periods = [
    { label: 'Real-time', value: 'realtime' },
    { label: 'Last 7 Days', value: '7days' },
    { label: '30 Days', value: '30days' }
  ]

  const keywordInsight = insights.find(i => i.type === 'keyword')
  const alertInsight = insights.find(i => i.type === 'alert')
  const automatedInsight = insights.find(i => i.type === 'insight')
  const engagementSources = insights.filter(i => i.type === 'source')

  return (
    <div className="h-full overflow-auto" data-testid="analytics-page">
      <div className="max-w-7xl mx-auto p-8 space-y-6">
        {/* Page Header */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-on-surface-variant font-medium mb-2">PERFORMANCE OVERVIEW</p>
            <h1 className="text-4xl font-display font-bold text-on-surface mb-2">Analytics & Insights</h1>
          </div>
          <Button variant="outline" data-testid="export-report-button">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Top Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Projected Revenue */}
          <div className="p-6 rounded-2xl surface-container-lowest col-span-1">
            <div className="flex items-start justify-between mb-4">
              <p className="text-sm text-on-surface-variant">TOTAL PROJECTED REVENUE</p>
              <div className="flex items-center gap-1 text-[hsl(var(--success))] text-sm font-medium">
                <TrendingUp className="w-4 h-4" />
                <span>+{summary.revenue_change}%</span>
              </div>
            </div>
            <h2 className="text-5xl font-display font-bold text-[hsl(var(--primary))] mb-4">
              ${summary.total_revenue.toLocaleString()}
            </h2>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <Avatar className="w-6 h-6 border-2 border-[hsl(var(--surface-container-lowest))]">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user1" />
                </Avatar>
                <Avatar className="w-6 h-6 border-2 border-[hsl(var(--surface-container-lowest))]">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user2" />
                </Avatar>
              </div>
              <span className="text-xs text-on-surface-variant">+12 New high-value leads generated</span>
            </div>
          </div>

          {/* Best Keyword */}
          {keywordInsight && (
            <div className="p-6 rounded-2xl surface-container-lowest">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2.5 rounded-lg bg-[hsl(var(--primary)_/_0.1)]">
                  <Key className="w-5 h-5 text-[hsl(var(--primary))]" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-on-surface-variant font-medium mb-1">
                    {keywordInsight.title}
                  </p>
                  <h3 className="text-2xl font-display font-bold text-on-surface mb-1">
                    "{keywordInsight.value}"
                  </h3>
                  <div className="w-full h-2 rounded-full surface-container-high mt-3">
                    <div 
                      className="h-full rounded-full bg-[hsl(var(--primary))]"
                      style={{ width: keywordInsight.metric }}
                    />
                  </div>
                  <p className="text-sm text-on-surface-variant mt-2">{keywordInsight.description}</p>
                </div>
              </div>
            </div>
          )}

          {/* Drop-off Alert */}
          {alertInsight && (
            <div className="p-6 rounded-2xl surface-container-lowest">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-[hsl(var(--error)_/_0.1)]">
                  <AlertTriangle className="w-5 h-5 text-[hsl(var(--error))]" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-on-surface-variant font-medium mb-1">
                    {alertInsight.title}
                  </p>
                  <h3 className="text-2xl font-display font-bold text-on-surface mb-1">
                    {alertInsight.value}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <TrendingUp className="w-4 h-4 text-[hsl(var(--error))] rotate-180" />
                    <span className="text-sm font-medium text-[hsl(var(--error))]">
                      {alertInsight.metric} increase in abandonment
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Revenue Growth Chart */}
        <div className="surface-container-lowest rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-display font-semibold text-on-surface mb-1">
                Revenue Growth Stream
              </h2>
            </div>
            <div className="flex items-center gap-2">
              {periods.map((period) => (
                <button
                  key={period.value}
                  onClick={() => setSelectedPeriod(period.value)}
                  data-testid={`period-${period.value}`}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                    selectedPeriod === period.value
                      ? 'bg-[hsl(var(--primary))] text-white'
                      : 'surface-container-low text-on-surface-variant hover:surface-container'
                  )}
                >
                  {period.label}
                </button>
              ))}
            </div>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--outline-variant) / 0.2)" vertical={false} />
              <XAxis 
                dataKey="day" 
                stroke="hsl(var(--on-surface-variant))"
                tick={{ fill: 'hsl(var(--on-surface-variant))' }}
                axisLine={{ stroke: 'hsl(var(--outline-variant) / 0.3)' }}
              />
              <YAxis 
                stroke="hsl(var(--on-surface-variant))"
                tick={{ fill: 'hsl(var(--on-surface-variant))' }}
                axisLine={{ stroke: 'hsl(var(--outline-variant) / 0.3)' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--surface-container-lowest))',
                  border: '1px solid hsl(var(--outline-variant) / 0.3)',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
                labelStyle={{ color: 'hsl(var(--on-surface))' }}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                fill="url(#revenueGradient)"
                dot={{ fill: 'hsl(var(--primary))', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Automated Insight Card */}
            {automatedInsight && (
              <div className="surface-container-lowest rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl surface-container-high">
                    <TrendingUp className="w-6 h-6 text-[hsl(var(--primary))]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-on-surface-variant font-medium mb-1">
                      {automatedInsight.title}
                    </p>
                    <h3 className="text-xl font-display font-bold text-on-surface mb-2">
                      {automatedInsight.value}
                    </h3>
                    <p className="text-sm text-on-surface-variant mb-4">
                      {automatedInsight.description}
                    </p>
                    <Button size="sm" className="gradient-primary text-white" data-testid="apply-optimization">
                      {automatedInsight.metric}
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Highest Revenue Content */}
            <div className="surface-container-lowest rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-display font-semibold text-on-surface">
                  Highest Revenue Content
                </h2>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[hsl(var(--outline-variant)_/_0.15)]">
                      <th className="text-left py-3 px-2 text-xs font-medium text-on-surface-variant uppercase">
                        Campaign / Content
                      </th>
                      <th className="text-left py-3 px-2 text-xs font-medium text-on-surface-variant uppercase">
                        Platform
                      </th>
                      <th className="text-left py-3 px-2 text-xs font-medium text-on-surface-variant uppercase">
                        Sentiment
                      </th>
                      <th className="text-left py-3 px-2 text-xs font-medium text-on-surface-variant uppercase">
                        Reach
                      </th>
                      <th className="text-right py-3 px-2 text-xs font-medium text-on-surface-variant uppercase">
                        Revenue Generated
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {content.map((item, index) => (
                      <tr
                        key={item.id}
                        data-testid={`content-row-${index}`}
                        className="border-b border-[hsl(var(--outline-variant)_/_0.08)] hover:surface-container-low transition-colors"
                      >
                        <td className="py-4 px-2">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={item.avatar} />
                              <AvatarFallback>{item.title.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-on-surface text-sm">{item.title}</p>
                              <p className="text-xs text-on-surface-variant">{item.published}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-2">
                          <span className="text-sm text-on-surface">{item.platform}</span>
                        </td>
                        <td className="py-4 px-2">
                          <div className="flex items-center gap-2">
                            <div className="w-full max-w-[80px] h-1.5 rounded-full surface-container">
                              <div 
                                className={cn(
                                  "h-full rounded-full",
                                  item.sentiment === 'Positive' ? 'bg-[hsl(var(--success))]' : 'bg-[hsl(var(--warning))]'
                                )}
                                style={{ width: `${item.sentiment_score}%` }}
                              />
                            </div>
                            <span className="text-xs text-on-surface-variant">{item.sentiment_score}%</span>
                          </div>
                        </td>
                        <td className="py-4 px-2">
                          <span className="text-sm font-medium text-on-surface">{item.reach}</span>
                        </td>
                        <td className="py-4 px-2 text-right">
                          <span className="font-display font-semibold text-on-surface">
                            ${item.revenue.toLocaleString()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 text-center">
                <Button variant="link" className="text-[hsl(var(--primary))]" data-testid="view-detailed-breakdown">
                  View Detailed Breakdown →
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column - Engagement Sources */}
          <div className="space-y-6">
            <div className="surface-container-lowest rounded-2xl p-6">
              <h3 className="text-lg font-display font-semibold text-on-surface mb-6">
                Engagement Source
              </h3>
              <div className="space-y-4">
                {engagementSources.map((source, index) => (
                  <div key={index} data-testid={`engagement-source-${index}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {index === 0 ? <Mail className="w-4 h-4 text-on-surface-variant" /> : <Share2 className="w-4 h-4 text-on-surface-variant" />}
                        <span className="text-sm font-medium text-on-surface">{source.value}</span>
                      </div>
                      <span className="text-sm font-semibold text-on-surface">{source.metric}</span>
                    </div>
                    <div className="w-full h-2 rounded-full surface-container">
                      <div 
                        className="h-full rounded-full gradient-primary"
                        style={{ width: source.metric }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
