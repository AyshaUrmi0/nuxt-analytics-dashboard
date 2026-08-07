<script setup lang="ts">
import { computed } from 'vue';
import type { KpiMetric } from '~/types/dashboard';
import {
  DollarSign,
  Users,
  TrendingUp,
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-vue-next';

const props = defineProps<{
  metric: KpiMetric;
}>();

// Dynamic Lucide icon resolution
const iconComponent = computed(() => {
  switch (props.metric.icon) {
    case 'DollarSign': return DollarSign;
    case 'Users': return Users;
    case 'TrendingUp': return TrendingUp;
    case 'Activity': return Activity;
    default: return Activity;
  }
});

// Generate inline SVG path string for the mini sparkline trend
const sparklineSvgPath = computed(() => {
  const data = props.metric.trendData;
  if (!data || data.length < 2) return '';

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const width = 100;
  const height = 36;

  const points = data.map((val, idx) => {
    const x = (idx / (data.length - 1)) * width;
    const y = height - ((val - min) / range) * (height - 8) - 4;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  return `M ${points.join(' L ')}`;
});

const sparklineGradientId = computed(() => `sparkline-grad-${props.metric.id}`);
</script>

<template>
  <div class="glass-card p-5 relative overflow-hidden group">
    <!-- Subtle Background Glow -->
    <div
      :class="[
        'absolute -right-6 -bottom-6 w-24 h-24 rounded-full blur-2xl transition-opacity duration-300 opacity-20 group-hover:opacity-40',
        props.metric.isPositive ? 'bg-emerald-500' : 'bg-rose-500'
      ]"
    ></div>

    <div class="flex items-center justify-between mb-3">
      <span class="text-xs font-semibold text-slate-500 dark:text-slate-400 tracking-wide uppercase">
        {{ props.metric.title }}
      </span>

      <!-- Icon Wrapper -->
      <div
        :class="[
          'w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110',
          props.metric.id === 'revenue' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' : '',
          props.metric.id === 'users' ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400' : '',
          props.metric.id === 'conversion' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : '',
          props.metric.id === 'bounce' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' : '',
        ]"
      >
        <component :is="iconComponent" class="w-5 h-5" />
      </div>
    </div>

    <!-- Main Value & Sparkline Row -->
    <div class="flex items-end justify-between gap-2">
      <div>
        <div class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-1">
          {{ props.metric.value }}
        </div>

        <div class="flex items-center space-x-1.5 text-xs">
          <!-- Change Badge -->
          <span
            :class="[
              'inline-flex items-center font-bold px-2 py-0.5 rounded-md text-[11px]',
              props.metric.isPositive
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
            ]"
          >
            <ArrowUpRight v-if="props.metric.isPositive" class="w-3 h-3 mr-0.5" />
            <ArrowDownRight v-else class="w-3 h-3 mr-0.5" />
            {{ props.metric.change }}
          </span>

          <span class="text-slate-400 dark:text-slate-500 text-[11px] truncate">
            {{ props.metric.periodLabel }}
          </span>
        </div>
      </div>

      <!-- Mini Sparkline SVG -->
      <div class="w-24 h-10 flex-shrink-0">
        <svg class="w-full h-full overflow-visible" viewBox="0 0 100 36">
          <defs>
            <linearGradient :id="sparklineGradientId" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" :stop-color="props.metric.isPositive ? '#10b981' : '#f43f5e'" stop-opacity="0.35" />
              <stop offset="100%" :stop-color="props.metric.isPositive ? '#10b981' : '#f43f5e'" stop-opacity="0.0" />
            </linearGradient>
          </defs>

          <!-- Area Fill -->
          <path
            :d="`${sparklineSvgPath} L 100,36 L 0,36 Z`"
            :fill="`url(#${sparklineGradientId})`"
          />

          <!-- Spline Line -->
          <path
            :d="sparklineSvgPath"
            fill="none"
            :stroke="props.metric.isPositive ? '#10b981' : '#f43f5e'"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
  </div>
</template>
