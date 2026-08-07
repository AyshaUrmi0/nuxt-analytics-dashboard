<script setup lang="ts">
import { computed } from 'vue';
import type { TrafficSourceItem } from '~/types/dashboard';
import { PieChart, RefreshCw } from 'lucide-vue-next';

const props = defineProps<{
  data: TrafficSourceItem[];
  isDark: boolean;
}>();

const totalVisits = computed(() => {
  return props.data.reduce((acc, curr) => acc + curr.value, 0);
});

const chartOption = computed(() => {
  const textColor = props.isDark ? '#94a3b8' : '#64748b';
  const tooltipBg = props.isDark ? '#0f172a' : '#ffffff';
  const tooltipBorder = props.isDark ? '#334155' : '#e2e8f0';

  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: tooltipBg,
      borderColor: tooltipBorder,
      borderWidth: 1,
      textStyle: {
        color: props.isDark ? '#f8fafc' : '#0f172a',
        fontSize: 12,
        fontFamily: 'Plus Jakarta Sans'
      },
      padding: [10, 14],
      formatter: '{b}: <b class="ml-1">{c}%</b> ({d}%)'
    },
    legend: {
      bottom: '0%',
      left: 'center',
      icon: 'circle',
      itemGap: 14,
      textStyle: {
        color: textColor,
        fontSize: 11,
        fontFamily: 'Plus Jakarta Sans'
      }
    },
    series: [
      {
        name: 'Traffic Source',
        type: 'pie',
        radius: ['55%', '80%'],
        center: ['50%', '42%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 8,
          borderColor: props.isDark ? '#0f172a' : '#ffffff',
          borderWidth: 3
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          scale: true,
          scaleSize: 6,
          label: {
            show: true,
            fontSize: 16,
            fontWeight: 'bold',
            fontFamily: 'Plus Jakarta Sans',
            color: props.isDark ? '#ffffff' : '#0f172a',
            formatter: '{b}\n{d}%'
          }
        },
        labelLine: {
          show: false
        },
        data: props.data.map(item => ({
          name: item.name,
          value: item.value,
          itemStyle: { color: item.color }
        }))
      }
    ]
  };
});
</script>

<template>
  <div class="glass-card p-6 flex flex-col justify-between h-[420px]">
    <!-- Chart Header -->
    <div class="flex items-center justify-between mb-2">
      <div>
        <div class="flex items-center space-x-2">
          <PieChart class="w-5 h-5 text-emerald-500" />
          <h3 class="text-base font-bold text-slate-900 dark:text-white tracking-tight">
            Traffic Sources Distribution
          </h3>
        </div>
        <p class="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
          Channel attribution split
        </p>
      </div>

      <span class="px-2.5 py-1 text-xs font-medium rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
        100% Total
      </span>
    </div>

    <!-- Doughnut Chart Container -->
    <div class="flex-1 w-full relative">
      <ClientOnly>
        <v-chart
          class="w-full h-full"
          :option="chartOption"
          autoresize
        />

        <!-- Center Overlay Badge when not hovering -->
        <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-12">
          <span class="text-xs font-semibold text-slate-400 dark:text-slate-500">Channels</span>
          <span class="text-xl font-extrabold text-slate-900 dark:text-white">{{ props.data.length }}</span>
        </div>

        <template #fallback>
          <div class="w-full h-full flex flex-col justify-center items-center space-y-3 bg-slate-100/50 dark:bg-slate-800/30 rounded-xl animate-pulse-subtle">
            <RefreshCw class="w-6 h-6 text-emerald-500 animate-spin" />
            <span class="text-xs font-medium text-slate-400">Loading Traffic Distribution...</span>
          </div>
        </template>
      </ClientOnly>
    </div>
  </div>
</template>
