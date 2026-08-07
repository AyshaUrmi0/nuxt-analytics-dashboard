<script setup lang="ts">
import { computed } from 'vue';
import type { MonthlyRevenueData } from '~/types/dashboard';
import { TrendingUp, RefreshCw } from 'lucide-vue-next';

const props = defineProps<{
  data: MonthlyRevenueData;
  isDark: boolean;
}>();

// Compute reactive ECharts configuration object
const chartOption = computed(() => {
  const textColor = props.isDark ? '#94a3b8' : '#64748b';
  const gridColor = props.isDark ? 'rgba(51, 65, 85, 0.4)' : 'rgba(226, 232, 240, 0.8)';
  const tooltipBg = props.isDark ? '#0f172a' : '#ffffff';
  const tooltipBorder = props.isDark ? '#334155' : '#e2e8f0';

  return {
    backgroundColor: 'transparent',
    grid: {
      top: '15%',
      left: '3%',
      right: '4%',
      bottom: '8%',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: tooltipBg,
      borderColor: tooltipBorder,
      borderWidth: 1,
      textStyle: {
        color: props.isDark ? '#f8fafc' : '#0f172a',
        fontSize: 12,
        fontFamily: 'Plus Jakarta Sans'
      },
      padding: [10, 14],
      shadowBlur: 10,
      shadowColor: 'rgba(0, 0, 0, 0.2)',
      formatter: (params: any) => {
        let res = `<div class="font-bold mb-1">${params[0].name}</div>`;
        params.forEach((item: any) => {
          const val = `$${item.value.toLocaleString()}`;
          res += `<div class="flex items-center gap-2 text-xs py-0.5">
            <span class="w-2 h-2 rounded-full" style="background-color: ${item.color}"></span>
            <span class="opacity-80">${item.seriesName}:</span>
            <span class="font-semibold ml-auto">${val}</span>
          </div>`;
        });
        return res;
      }
    },
    legend: {
      right: '4%',
      top: '2%',
      icon: 'circle',
      textStyle: {
        color: textColor,
        fontSize: 12,
        fontFamily: 'Plus Jakarta Sans'
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: props.data.categories,
      axisLine: {
        lineStyle: { color: gridColor }
      },
      axisTick: { show: false },
      axisLabel: {
        color: textColor,
        fontSize: 11,
        fontFamily: 'Plus Jakarta Sans',
        margin: 12
      }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      splitLine: {
        lineStyle: {
          color: gridColor,
          type: 'dashed'
        }
      },
      axisLabel: {
        color: textColor,
        fontSize: 11,
        fontFamily: 'Plus Jakarta Sans',
        formatter: (val: number) => val >= 1000 ? `$${val / 1000}k` : `$${val}`
      }
    },
    series: [
      {
        name: 'Current Revenue',
        type: 'line',
        smooth: true,
        showSymbol: false,
        symbolSize: 6,
        lineStyle: {
          width: 3,
          color: '#3b82f6'
        },
        areaStyle: {
          opacity: 0.8,
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(59, 130, 246, 0.4)' },
              { offset: 1, color: 'rgba(59, 130, 246, 0.0)' }
            ]
          }
        },
        data: props.data.currentPeriod
      },
      {
        name: 'Previous Target',
        type: 'line',
        smooth: true,
        showSymbol: false,
        lineStyle: {
          width: 2,
          type: 'dashed',
          color: '#94a3b8'
        },
        data: props.data.previousPeriod
      }
    ]
  };
});
</script>

<template>
  <div class="glass-card p-6 flex flex-col justify-between h-[420px]">
    <!-- Chart Header -->
    <div class="flex items-center justify-between mb-4">
      <div>
        <div class="flex items-center space-x-2">
          <TrendingUp class="w-5 h-5 text-brand-500" />
          <h3 class="text-base font-bold text-slate-900 dark:text-white tracking-tight">
            Revenue Performance Trend
          </h3>
        </div>
        <p class="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
          Real-time gross revenue progression vs set goals
        </p>
      </div>

      <div class="flex items-center space-x-2">
        <span class="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
          Smooth Spline
        </span>
      </div>
    </div>

    <!-- Chart Body SSR Safe ClientOnly -->
    <div class="flex-1 w-full relative">
      <ClientOnly>
        <v-chart
          class="w-full h-full"
          :option="chartOption"
          autoresize
        />

        <!-- Loading Skeleton Fallback for SSR Hydration -->
        <template #fallback>
          <div class="w-full h-full flex flex-col justify-center items-center space-y-3 bg-slate-100/50 dark:bg-slate-800/30 rounded-xl animate-pulse-subtle">
            <RefreshCw class="w-6 h-6 text-brand-500 animate-spin" />
            <span class="text-xs font-medium text-slate-400">Loading Revenue Chart...</span>
          </div>
        </template>
      </ClientOnly>
    </div>
  </div>
</template>
