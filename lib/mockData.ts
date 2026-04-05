import campaignsData from '@/data/campaigns.json';
import contentData from '@/data/content.json';
import insightsData from '@/data/insights.json';
import type { Campaign, Content, Insight, RevenueDataPoint, DashboardMetrics, AnalyticsSummary } from '@/types';

// Generate mock revenue data
export function generateRevenueData(period: string = '7days'): RevenueDataPoint[] {
  const daysMap: Record<string, number> = {
    'realtime': 7,
    '7days': 7,
    '30days': 30,
    'alltime': 90
  };
  
  const days = daysMap[period] || 7;
  const data: RevenueDataPoint[] = [];
  const baseRevenue = 15000;
  const dayNames = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  
  for (let i = 0; i < days; i++) {
    const dayLabel = days <= 7 ? dayNames[i % 7] : `Day ${i + 1}`;
    const variance = Math.random() * 8000 - 3000;
    const revenue = baseRevenue + variance + (i * 200);
    
    data.push({
      day: dayLabel,
      revenue: Math.round(revenue * 100) / 100
    });
  }
  
  return data;
}

// Get all campaigns
export function getCampaigns(): Campaign[] {
  return campaignsData.campaigns as Campaign[];
}

// Get active campaigns
export function getActiveCampaigns(): Campaign[] {
  return getCampaigns().filter((c) => c.status === 'Active');
}

// Get dashboard metrics
export function getDashboardMetrics(): DashboardMetrics {
  const campaigns = getCampaigns();
  const active = campaigns.filter(c => c.status === 'Active');
  const pending = campaigns.filter(c => c.status === 'Scheduled' || c.status === 'Draft');
  
  const totalRevenue = active.reduce((sum, c) => sum + c.revenue, 0);
  const avgConversion = active.length > 0
    ? active.reduce((sum, c) => sum + c.conversion_rate, 0) / active.length
    : 0;
  
  return {
    total_active_revenue: totalRevenue,
    revenue_change: 24.8,
    live_campaigns: active.length,
    pending_campaigns: pending.length,
    avg_conversion: Math.round(avgConversion * 10) / 10
  };
}

// Get analytics summary
export function getAnalyticsSummary(): AnalyticsSummary {
  const campaigns = getCampaigns();
  const active = getActiveCampaigns();
  const pending = campaigns.filter(c => c.status === 'Scheduled' || c.status === 'Draft');
  
  const totalRevenue = campaigns.reduce((sum, c) => sum + c.revenue, 0);
  const totalDms = campaigns.reduce((sum, c) => sum + c.dms_sent, 0);
  const avgConversion = active.length > 0
    ? active.reduce((sum, c) => sum + c.conversion_rate, 0) / active.length
    : 0;
  
  return {
    total_revenue: totalRevenue,
    revenue_change: 26.8,
    total_campaigns: campaigns.length,
    pending_approval: pending.length,
    avg_conversion: Math.round(avgConversion * 10) / 10,
    total_dms_sent: totalDms,
    total_clicks: Math.round(totalDms * 0.65)
  };
}

// Get content
export function getContent(): Content[] {
  return contentData.content as Content[];
}

// Get insights
export function getInsights(): Insight[] {
  return insightsData.insights as Insight[];
}
