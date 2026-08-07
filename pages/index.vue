<script setup lang="ts">
import { onMounted } from 'vue';
import { useDashboardData } from '~/composables/useDashboardData';
import Sidebar from '~/components/layout/Sidebar.vue';
import Navbar from '~/components/layout/Navbar.vue';
import KpiCard from '~/components/dashboard/KpiCard.vue';
import LineChartWrapper from '~/components/dashboard/LineChartWrapper.vue';
import BarChartWrapper from '~/components/dashboard/BarChartWrapper.vue';
import PieChartWrapper from '~/components/dashboard/PieChartWrapper.vue';
import {
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Download,
  Filter,
  Layers
} from 'lucide-vue-next';

const {
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
} = useDashboardData();

onMounted(() => {
  initTheme();
});
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-[#0b0f19] text-slate-900 dark:text-slate-100 flex transition-colors duration-300 font-sans">
    <!-- Sidebar Component -->
    <Sidebar
      v-model:currentNav="currentNav"
      :isMobileOpen="isMobileMenuOpen"
      @closeMobileMenu="isMobileMenuOpen = false"
    />

    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col min-w-0 lg:pl-64 transition-all duration-300">

      <!-- Top Navbar Component -->
      <Navbar
        :isDark="isDark"
        v-model:selectedDateFilter="selectedDateFilter"
        :dateFilterOptions="dateFilterOptions"
        @toggleTheme="toggleTheme"
        @openMobileMenu="isMobileMenuOpen = true"
      />

      <!-- Dashboard View Body -->
      <main class="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 max-w-[1600px] w-full mx-auto">

        <!-- Welcome Banner & Quick Action Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-brand-600 via-blue-600 to-cyan-500 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-brand-500/10 relative overflow-hidden">
          <!-- Background decorative shapes -->
          <div class="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

          <div class="relative z-10 space-y-1">
            <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold text-white mb-2">
              <Zap class="w-3.5 h-3.5 text-amber-300" />
              <span>Real-Time Intelligence Active</span>
            </div>
            <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Executive Analytics Command Center
            </h1>
            <p class="text-xs sm:text-sm text-blue-100 max-w-xl leading-relaxed">
              Monitoring global metrics, user engagement velocity, and conversion pipelines for {{ selectedDateFilter === '7d' ? 'the past week' : selectedDateFilter === '30d' ? 'this month' : selectedDateFilter === '90d' ? 'this quarter' : 'the full year' }}.
            </p>
          </div>

          <!-- Quick Action Buttons -->
          <div class="relative z-10 flex items-center space-x-3">
            <button class="flex items-center space-x-2 px-4 py-2.5 bg-white/15 hover:bg-white/25 border border-white/20 backdrop-blur-md rounded-xl text-xs font-bold text-white transition-all shadow-sm">
              <Filter class="w-4 h-4" />
              <span>Filter View</span>
            </button>
            <button class="flex items-center space-x-2 px-4 py-2.5 bg-white text-slate-900 hover:bg-slate-100 rounded-xl text-xs font-bold transition-all shadow-lg hover:shadow-xl">
              <Download class="w-4 h-4 text-brand-600" />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        <!-- Requirement 2: Grid of 4 KPI Cards -->
        <section class="space-y-3">
          <div class="flex items-center justify-between">
            <h2 class="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Key Performance Metrics
            </h2>
            <span class="text-xs font-semibold text-brand-600 dark:text-brand-400 flex items-center">
              <ShieldCheck class="w-3.5 h-3.5 mr-1" /> Verified Data
            </span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <KpiCard
              v-for="metric in kpiMetrics"
              :key="metric.id"
              :metric="metric"
            />
          </div>
        </section>

        <!-- Requirement 3: Chart Components Grid -->
        <section class="space-y-3">
          <div class="flex items-center justify-between">
            <h2 class="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Visual Intelligence & Trends
            </h2>
            <div class="flex items-center space-x-2">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span class="text-xs font-medium text-slate-500 dark:text-slate-400">Live ECharts Engine</span>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <!-- Line Chart (Monthly Revenue Trend) - 7 Cols -->
            <div class="lg:col-span-7">
              <LineChartWrapper
                :data="revenueData"
                :isDark="isDark"
              />
            </div>

            <!-- Bar Chart (Weekly User Engagement) - 5 Cols -->
            <div class="lg:col-span-5">
              <BarChartWrapper
                :data="engagementData"
                :isDark="isDark"
              />
            </div>

            <!-- Traffic Sources Pie/Doughnut Chart - 5 Cols -->
            <div class="lg:col-span-5">
              <PieChartWrapper
                :data="trafficSources"
                :isDark="isDark"
              />
            </div>

            <!-- Recent Activity Table - 7 Cols -->
            <div class="lg:col-span-7 glass-card p-6 flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between mb-4">
                  <div>
                    <h3 class="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                      Recent High-Value Activity
                    </h3>
                    <p class="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                      Live transaction stream and user conversions
                    </p>
                  </div>
                  <button class="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline">
                    View All Activity
                  </button>
                </div>

                <!-- Table -->
                <div class="overflow-x-auto">
                  <table class="w-full text-left border-collapse">
                    <thead>
                      <tr class="border-b border-slate-200/80 dark:border-slate-800 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                        <th class="py-3 px-2">User</th>
                        <th class="py-3 px-2">Event</th>
                        <th class="py-3 px-2">Amount</th>
                        <th class="py-3 px-2">Time</th>
                        <th class="py-3 px-2 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100 dark:divide-slate-800/50 text-xs">
                      <tr
                        v-for="act in recentActivities"
                        :key="act.id"
                        class="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                      >
                        <td class="py-3 px-2">
                          <div class="flex items-center space-x-3">
                            <img
                              :src="act.user.avatar"
                              :alt="act.user.name"
                              class="w-7 h-7 rounded-lg object-cover"
                            />
                            <div class="flex flex-col">
                              <span class="font-bold text-slate-800 dark:text-slate-200">{{ act.user.name }}</span>
                              <span class="text-[10px] text-slate-400">{{ act.user.email }}</span>
                            </div>
                          </div>
                        </td>
                        <td class="py-3 px-2 font-medium text-slate-700 dark:text-slate-300">
                          {{ act.event }}
                        </td>
                        <td class="py-3 px-2 font-bold text-slate-900 dark:text-white">
                          {{ act.amount || '—' }}
                        </td>
                        <td class="py-3 px-2 text-slate-400 dark:text-slate-500 text-[11px]">
                          {{ act.date }}
                        </td>
                        <td class="py-3 px-2 text-right">
                          <span
                            :class="[
                              'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold',
                              act.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : '',
                              act.status === 'Pending' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' : '',
                              act.status === 'Failed' ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400' : ''
                            ]"
                          >
                            {{ act.status }}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  </div>
</template>
