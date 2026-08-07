export type DateFilterValue = '7d' | '30d' | '90d' | '1y';

export interface DateFilterOption {
  label: string;
  value: DateFilterValue;
}

export interface KpiMetric {
  id: string;
  title: string;
  value: string;
  unit?: string;
  change: string;
  isPositive: boolean;
  periodLabel: string;
  trendData: number[];
  icon: string;
}

export interface MonthlyRevenueData {
  categories: string[];
  currentPeriod: number[];
  previousPeriod: number[];
}

export interface EngagementData {
  categories: string[];
  desktop: number[];
  mobile: number[];
  tablet: number[];
}

export interface TrafficSourceItem {
  name: string;
  value: number;
  color: string;
}

export interface UserActivity {
  id: string;
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  event: string;
  amount?: string;
  date: string;
  status: 'Completed' | 'Pending' | 'Failed';
}
