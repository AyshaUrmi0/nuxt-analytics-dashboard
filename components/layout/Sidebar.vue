<script setup lang="ts">
import { ref } from 'vue';
import {
  LayoutDashboard,
  BarChart3,
  Settings,
  Users,
  CreditCard,
  HelpCircle,
  Sparkles,
  ChevronLeft,
  X
} from 'lucide-vue-next';

const props = defineProps<{
  currentNav: string;
  isMobileOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:currentNav', val: string): void;
  (e: 'closeMobileMenu'): void;
}>();

const isCollapsed = ref(false);

const navItems = [
  { id: 'overview', name: 'Overview', icon: LayoutDashboard, badge: null },
  { id: 'analytics', name: 'Analytics', icon: BarChart3, badge: 'Live' },
  { id: 'customers', name: 'Customers', icon: Users, badge: null },
  { id: 'billing', name: 'Billing', icon: CreditCard, badge: null },
  { id: 'settings', name: 'Settings', icon: Settings, badge: null },
];

const handleNavClick = (id: string) => {
  emit('update:currentNav', id);
  emit('closeMobileMenu');
};
</script>

<template>
  <div>
    <!-- Mobile Backdrop Overlay -->
    <div
      v-if="isMobileOpen"
      class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
      @click="emit('closeMobileMenu')"
    ></div>

    <!-- Sidebar Container -->
    <aside
      :class="[
        'fixed top-0 left-0 bottom-0 z-50 flex flex-col bg-white dark:bg-[#0f172a] border-r border-slate-200 dark:border-slate-800/80 transition-all duration-300 ease-in-out',
        isCollapsed ? 'w-20' : 'w-64',
        isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      ]"
    >
      <!-- Header / Logo -->
      <div class="h-16 flex items-center justify-between px-5 border-b border-slate-200/80 dark:border-slate-800/80">
        <div class="flex items-center space-x-3 overflow-hidden">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-blue-500 to-cyan-400 flex items-center justify-center text-white shadow-glow-brand flex-shrink-0">
            <Sparkles class="w-5 h-5" />
          </div>
          <div v-if="!isCollapsed" class="flex flex-col whitespace-nowrap">
            <span class="font-bold text-slate-900 dark:text-white tracking-tight leading-tight">ApexPulse</span>
            <span class="text-xs text-brand-600 dark:text-brand-400 font-medium">Enterprise AI</span>
          </div>
        </div>

        <!-- Mobile Close Button -->
        <button
          class="lg:hidden text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white p-1 rounded-lg"
          @click="emit('closeMobileMenu')"
        >
          <X class="w-6 h-6" />
        </button>

        <!-- Desktop Collapse Button -->
        <button
          v-if="!isMobileOpen"
          class="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          @click="isCollapsed = !isCollapsed"
          :title="isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'"
        >
          <ChevronLeft :class="['w-4 h-4 transition-transform duration-300', isCollapsed ? 'rotate-180' : '']" />
        </button>
      </div>

      <!-- Navigation Links -->
      <div class="flex-1 py-6 px-3 space-y-1.5 overflow-y-auto">
        <div v-if="!isCollapsed" class="px-3 mb-2 text-[11px] font-semibold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
          Main Menu
        </div>

        <button
          v-for="item in navItems"
          :key="item.id"
          @click="handleNavClick(item.id)"
          :class="[
            'w-full flex items-center rounded-xl font-medium text-sm transition-all duration-200 group relative',
            isCollapsed ? 'justify-center px-0 py-3' : 'px-3.5 py-2.5 space-x-3',
            props.currentNav === item.id
              ? 'bg-brand-500/10 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400 font-semibold'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
          ]"
        >
          <component
            :is="item.icon"
            :class="[
              'w-5 h-5 flex-shrink-0 transition-colors',
              props.currentNav === item.id ? 'text-brand-600 dark:text-brand-400' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300'
            ]"
          />
          <span v-if="!isCollapsed" class="truncate flex-1 text-left">{{ item.name }}</span>

          <span
            v-if="item.badge && !isCollapsed"
            class="px-2 py-0.5 text-[10px] font-bold uppercase rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
          >
            {{ item.badge }}
          </span>

          <!-- Tooltip for collapsed state -->
          <div
            v-if="isCollapsed"
            class="absolute left-full ml-3 px-2.5 py-1.5 bg-slate-900 text-white text-xs font-medium rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap shadow-xl"
          >
            {{ item.name }}
          </div>
        </button>
      </div>

      <!-- Footer Upgrade Card & Support -->
      <div class="p-3 border-t border-slate-200/80 dark:border-slate-800/80 space-y-2">
        <div
          v-if="!isCollapsed"
          class="p-4 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800/90 dark:to-slate-900 text-white shadow-md relative overflow-hidden"
        >
          <div class="absolute -right-4 -bottom-4 w-20 h-20 bg-brand-500/20 rounded-full blur-xl"></div>
          <div class="flex items-center space-x-2 text-brand-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Sparkles class="w-3.5 h-3.5" />
            <span>Pro Insights</span>
          </div>
          <p class="text-xs text-slate-300 mb-3 leading-relaxed">
            Get unlimited real-time AI anomaly detection.
          </p>
          <button class="w-full py-1.5 px-3 bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm">
            Upgrade Plan
          </button>
        </div>

        <button
          class="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
          :class="isCollapsed ? 'justify-center px-0' : ''"
        >
          <HelpCircle class="w-4 h-4 flex-shrink-0 text-slate-400" />
          <span v-if="!isCollapsed">Help & Documentation</span>
        </button>
      </div>
    </aside>
  </div>
</template>
