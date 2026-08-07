import { ref, computed, watch, onMounted } from 'vue';
import type {
  DateFilterValue,
  DateFilterOption,
  KpiMetric,
  MonthlyRevenueData,
  EngagementData,
  TrafficSourceItem,
  UserActivity
} from '~/types/dashboard';

export function useDashboardData() {
  // Dark mode state
  const isDark = ref(true);

  // Initialize theme from localStorage or system preferences on client
  const toggleTheme = () => {
    isDark.value = !isDark.value;
    if (process.client) {
      if (isDark.value) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }
  };

  const initTheme = () => {
    if (process.client) {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        isDark.value = savedTheme === 'dark';
      } else {
        isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      if (isDark.value) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  // Date Filter options
  const dateFilterOptions: DateFilterOption[] = [
    { label: 'Last 7 Days', value: '7d' },
    { label: 'Last 30 Days', value: '30d' },
    { label: 'Last 90 Days', value: '90d' },
    { label: 'This Year', value: '1y' }
  ];

  const selectedDateFilter = ref<DateFilterValue>('30d');

  // Sidebar navigation state
  const currentNav = ref('overview');
  const isMobileMenuOpen = ref(false);

  // Mock data generators responsive to date filter selection
  const kpiMetrics = computed<KpiMetric[]>(() => {
    const periodMap: Record<DateFilterValue, string> = {
      '7d': 'vs previous 7 days',
      '30d': 'vs previous month',
      '90d': 'vs previous quarter',
      '1y': 'vs previous year'
    };

    const periodLabel = periodMap[selectedDateFilter.value];

    if (selectedDateFilter.value === '7d') {
      return [
        {
          id: 'revenue',
          title: 'Total Revenue',
          value: '$28,450',
          change: '+14.2%',
          isPositive: true,
          periodLabel,
          trendData: [32, 38, 35, 42, 40, 48, 52],
          icon: 'DollarSign'
        },
        {
          id: 'users',
          title: 'Active Users',
          value: '4,120',
          change: '+8.5%',
          isPositive: true,
          periodLabel,
          trendData: [500, 580, 560, 620, 690, 710, 750],
          icon: 'Users'
        },
        {
          id: 'conversion',
          title: 'Conversion Rate',
          value: '3.84%',
          change: '+0.4%',
          isPositive: true,
          periodLabel,
          trendData: [3.1, 3.2, 3.5, 3.4, 3.7, 3.8, 3.84],
          icon: 'TrendingUp'
        },
        {
          id: 'bounce',
          title: 'Bounce Rate',
          value: '38.2%',
          change: '-2.1%',
          isPositive: true, // Lower bounce rate is positive!
          periodLabel,
          trendData: [42.5, 41.8, 40.2, 41.0, 39.5, 38.9, 38.2],
          icon: 'Activity'
        }
      ];
    }

    if (selectedDateFilter.value === '90d') {
      return [
        {
          id: 'revenue',
          title: 'Total Revenue',
          value: '$342,800',
          change: '+19.8%',
          isPositive: true,
          periodLabel,
          trendData: [95, 102, 110, 108, 115, 122, 130, 128, 142],
          icon: 'DollarSign'
        },
        {
          id: 'users',
          title: 'Active Users',
          value: '34,920',
          change: '+15.2%',
          isPositive: true,
          periodLabel,
          trendData: [9200, 9800, 10400, 11000, 11500, 12100, 12800, 13400, 14200],
          icon: 'Users'
        },
        {
          id: 'conversion',
          title: 'Conversion Rate',
          value: '4.12%',
          change: '+0.8%',
          isPositive: true,
          periodLabel,
          trendData: [3.3, 3.5, 3.6, 3.7, 3.8, 3.9, 4.0, 4.05, 4.12],
          icon: 'TrendingUp'
        },
        {
          id: 'bounce',
          title: 'Bounce Rate',
          value: '36.5%',
          change: '-3.4%',
          isPositive: true,
          periodLabel,
          trendData: [41.2, 40.5, 39.8, 39.1, 38.5, 38.0, 37.4, 36.9, 36.5],
          icon: 'Activity'
        }
      ];
    }

    if (selectedDateFilter.value === '1y') {
      return [
        {
          id: 'revenue',
          title: 'Total Revenue',
          value: '$1,482,900',
          change: '+24.5%',
          isPositive: true,
          periodLabel,
          trendData: [85, 92, 105, 118, 124, 135, 142, 150, 162, 175, 188, 195],
          icon: 'DollarSign'
        },
        {
          id: 'users',
          title: 'Active Users',
          value: '128,450',
          change: '+21.3%',
          isPositive: true,
          periodLabel,
          trendData: [8200, 8900, 9500, 10200, 11000, 11800, 12400, 13200, 14100, 15000, 15800, 16500],
          icon: 'Users'
        },
        {
          id: 'conversion',
          title: 'Conversion Rate',
          value: '4.35%',
          change: '+1.1%',
          isPositive: true,
          periodLabel,
          trendData: [3.2, 3.4, 3.5, 3.6, 3.8, 3.9, 4.0, 4.1, 4.15, 4.2, 4.3, 4.35],
          icon: 'TrendingUp'
        },
        {
          id: 'bounce',
          title: 'Bounce Rate',
          value: '34.8%',
          change: '-5.2%',
          isPositive: true,
          periodLabel,
          trendData: [42.0, 41.2, 40.5, 39.8, 39.0, 38.2, 37.5, 36.8, 36.0, 35.5, 35.0, 34.8],
          icon: 'Activity'
        }
      ];
    }

    // Default: '30d'
    return [
      {
        id: 'revenue',
        title: 'Total Revenue',
        value: '$124,580',
        change: '+12.5%',
        isPositive: true,
        periodLabel,
        trendData: [68, 72, 70, 78, 85, 82, 94, 98, 105, 112, 118, 124],
        icon: 'DollarSign'
      },
      {
        id: 'users',
        title: 'Active Users',
        value: '14,890',
        change: '+18.2%',
        isPositive: true,
        periodLabel,
        trendData: [1100, 1180, 1250, 1310, 1390, 1450, 1520, 1590, 1640, 1720, 1800, 1890],
        icon: 'Users'
      },
      {
        id: 'conversion',
        title: 'Conversion Rate',
        value: '3.92%',
        change: '-0.8%',
        isPositive: false,
        periodLabel,
        trendData: [4.2, 4.1, 4.0, 4.1, 3.95, 3.9, 3.88, 3.92, 3.91, 3.9, 3.93, 3.92],
        icon: 'TrendingUp'
      },
      {
        id: 'bounce',
        title: 'Bounce Rate',
        value: '37.4%',
        change: '-2.4%',
        isPositive: true, // Lower is positive
        periodLabel,
        trendData: [41.5, 40.8, 40.2, 39.6, 39.1, 38.8, 38.4, 38.1, 37.8, 37.6, 37.5, 37.4],
        icon: 'Activity'
      }
    ];
  });

  // Revenue chart dataset
  const revenueData = computed<MonthlyRevenueData>(() => {
    if (selectedDateFilter.value === '7d') {
      return {
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        currentPeriod: [3800, 4200, 3900, 4800, 5400, 6100, 4250],
        previousPeriod: [3200, 3600, 3500, 4100, 4700, 5200, 3700]
      };
    }
    if (selectedDateFilter.value === '90d') {
      return {
        categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8', 'Week 9', 'Week 10', 'Week 11', 'Week 12'],
        currentPeriod: [24000, 26500, 28000, 29500, 31000, 33500, 32000, 35400, 38000, 39200, 41500, 44200],
        previousPeriod: [21000, 22500, 24000, 25000, 26800, 28000, 27500, 29000, 31200, 33000, 34500, 36000]
      };
    }
    if (selectedDateFilter.value === '1y') {
      return {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        currentPeriod: [85000, 92000, 105000, 118000, 124000, 135000, 142000, 150000, 162000, 175000, 188000, 195000],
        previousPeriod: [70000, 75000, 82000, 91000, 98000, 104000, 110000, 118000, 125000, 132000, 140000, 148000]
      };
    }
    // Default 30d
    return {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      currentPeriod: [12500, 14200, 15800, 18900, 21400, 24800, 23500, 27900, 31200, 34500, 38900, 42100],
      previousPeriod: [9800, 11200, 12900, 14500, 16800, 18900, 19200, 21500, 24000, 26800, 29500, 32000]
    };
  });

  // Weekly User Engagement chart dataset
  const engagementData = computed<EngagementData>(() => {
    return {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      desktop: [340, 420, 510, 490, 610, 380, 290],
      mobile: [580, 690, 820, 790, 940, 810, 720],
      tablet: [120, 150, 190, 170, 220, 160, 130]
    };
  });

  // Traffic Source Doughnut chart dataset
  const trafficSources = computed<TrafficSourceItem[]>(() => {
    return [
      { name: 'Organic Search', value: 42, color: '#3b82f6' }, // Blue
      { name: 'Direct Traffic', value: 28, color: '#10b981' }, // Emerald
      { name: 'Social Media', value: 16, color: '#8b5cf6' },   // Purple
      { name: 'Referral', value: 9, color: '#f59e0b' },       // Amber
      { name: 'Email Campaign', value: 5, color: '#ec4899' }  // Pink
    ];
  });

  // Recent user activity logs
  const recentActivities = ref<UserActivity[]>([
    {
      id: 'act-1',
      user: { name: 'Sarah Jenkins', email: 'sarah.j@acme.io', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80' },
      event: 'Upgraded to Enterprise Plan',
      amount: '+$2,400.00',
      date: '2 minutes ago',
      status: 'Completed'
    },
    {
      id: 'act-2',
      user: { name: 'Alex Rivera', email: 'arivera@techflow.com', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80' },
      event: 'New Team Member Invited',
      date: '18 minutes ago',
      status: 'Completed'
    },
    {
      id: 'act-3',
      user: { name: 'Elena Rostova', email: 'elena@designhub.co', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' },
      event: 'API License Renewal',
      amount: '+$850.00',
      date: '1 hour ago',
      status: 'Completed'
    },
    {
      id: 'act-4',
      user: { name: 'Marcus Vance', email: 'm.vance@cloudnexus.net', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80' },
      event: 'Payment Method Updated',
      date: '3 hours ago',
      status: 'Pending'
    },
    {
      id: 'act-5',
      user: { name: 'David Kim', email: 'dkim@nextgen.ai', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80' },
      event: 'Monthly Subscription',
      amount: '+$199.00',
      date: '5 hours ago',
      status: 'Completed'
    }
  ]);

  return {
    isDark,
    toggleTheme,
    initTheme,
    dateFilterOptions,
    selectedDateFilter,
    currentNav,
    isMobileMenuOpen,
    kpiMetrics,
    revenueData,
    engagementData,
    trafficSources,
    recentActivities
  };
}
