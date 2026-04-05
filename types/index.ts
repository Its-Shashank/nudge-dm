export interface Campaign {
  id: string;
  name: string;
  keyword: string;
  platform: string;
  status: 'Active' | 'Scheduled' | 'Draft';
  dms_sent: number;
  click_rate: number;
  conversion_rate: number;
  revenue: number;
  date: string;
}

export interface Content {
  id: string;
  title: string;
  platform: string;
  reach: string;
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  sentiment_score: number;
  revenue: number;
  published: string;
  avatar: string;
}

export interface Insight {
  type: 'keyword' | 'alert' | 'insight' | 'source';
  title: string;
  value: string;
  description: string;
  metric: string;
}

export interface RevenueDataPoint {
  day: string;
  revenue: number;
}

export interface DashboardMetrics {
  total_active_revenue: number;
  revenue_change: number;
  live_campaigns: number;
  pending_campaigns: number;
  avg_conversion: number;
}

export interface AnalyticsSummary {
  total_revenue: number;
  revenue_change: number;
  total_campaigns: number;
  pending_approval: number;
  avg_conversion: number;
  total_dms_sent: number;
  total_clicks: number;
}
