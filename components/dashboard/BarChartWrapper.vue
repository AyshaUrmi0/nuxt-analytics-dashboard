<script setup lang="ts">
import { computed } from 'vue';
import type { EngagementData } from '~/types/dashboard';
import { BarChart2, RefreshCw } from 'lucide-vue-next';

const props = defineProps<{
  data: EngagementData;
  isDark: boolean;
}>();

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
      axisPointer: { type: 'shadow' },
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
      data: props.data.categories,
      axisLine: {
        lineStyle: { color: gridColor }
      },
      axisTick: { show: false },
      axisLabel: {
        color: textColor,
        fontSize: 11,
        fontFamily: 'Plus Jakarta Sans'
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
        fontFamily: 'Plus Jakarta Sans'
      }
    },
    series: [
      {
        name: 'Mobile',
        type: 'bar',
        stack: 'total',
        barWidth: '40%',
        itemStyle: {
          color: '#3b82f6',
          borderRadius: [0, 0, 4, 4]
        },
        data: props.data.mobile
      },
      {
        name: 'Desktop',
        type: 'bar',
        stack: 'total',
        barWidth: '40%',
        itemStyle: {
          color: '#10b981'
        },
        data: props.data.desktop
      },
      {
        name: 'Tablet',
        type: 'bar',
        stack: 'total',
        barWidth: '40%',
        itemStyle: {
          color: '#8b5cf6',
          borderRadius: [6, 6, 0, 0]
        },
        data: props.data.tablet
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
          <BarChart2 class="w-5 h-5 text-purple-500" />
          <h3 class="text-base font-bold text-slate-900 dark:text-white tracking-tight">
            Weekly Device Engagement
          </h3>
        </div>
        <p class="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
          Stacked Breakdown by Device Type (Mobile, Desktop, Tablet)
        </p>
      </div>

      <span class="px-2.5 py-1 text-xs font-medium rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400">
        Stacked View
      </span>
    </div>

    <!-- Chart Body SSR Safe ClientOnly -->
    <div class="flex-1 w-full relative">
      <ClientOnly>
        <v-chart
          class="w-full h-full"
          :option="chartOption"
          autoresize
        />

        <template #fallback>
          <div class="w-full h-full flex flex-col justify-center items-center space-y-3 bg-slate-100/50 dark:bg-slate-800/30 rounded-xl animate-pulse-subtle">
            <RefreshCw class="w-6 h-6 text-purple-500 animate-spin" />
            <span class="text-xs font-medium text-slate-400">Loading Engagement Chart...</span>
          </div>
        </template>
      </ClientOnly>
    </div>
  </div>
</template>
