<script setup lang="ts">
import { ref } from 'vue';
import type { DateFilterValue, DateFilterOption } from '~/types/dashboard';
import {
  Menu,
  Sun,
  Moon,
  Search,
  Bell,
  ChevronDown,
  Calendar
} from 'lucide-vue-next';

const props = defineProps<{
  isDark: boolean;
  selectedDateFilter: DateFilterValue;
  dateFilterOptions: DateFilterOption[];
}>();

const emit = defineEmits<{
  (e: 'toggleTheme'): void;
  (e: 'update:selectedDateFilter', val: DateFilterValue): void;
  (e: 'openMobileMenu'): void;
}>();

const isDropdownOpen = ref(false);

const selectFilter = (val: DateFilterValue) => {
  emit('update:selectedDateFilter', val);
  isDropdownOpen.value = false;
};

const getFilterLabel = computed(() => {
  const found = props.dateFilterOptions.find(o => o.value === props.selectedDateFilter);
  return found ? found.label : 'Select Period';
});
</script>

<template>
  <header class="sticky top-0 z-30 h-16 bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
    <div class="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">

      <!-- Left Side: Mobile Menu Button & Search Bar -->
      <div class="flex items-center gap-3 flex-1 max-w-md">
        <button
          class="lg:hidden p-2 rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          @click="emit('openMobileMenu')"
          aria-label="Open Mobile Menu"
        >
          <Menu class="w-6 h-6" />
        </button>

        <!-- Search Box -->
        <div class="relative w-full hidden sm:block">
          <Search class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Search analytics, reports, metrics..."
            class="w-full pl-10 pr-12 py-2 bg-slate-100/80 dark:bg-slate-800/50 border border-transparent dark:border-slate-700/50 rounded-xl text-xs font-medium text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all"
          />
          <span class="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-700/60 rounded border border-slate-200 dark:border-slate-600">
            ⌘K
          </span>
        </div>
      </div>

      <!-- Right Side Controls -->
      <div class="flex items-center gap-2 sm:gap-4">

        <!-- Date Filter Dropdown -->
        <div class="relative">
          <button
            @click="isDropdownOpen = !isDropdownOpen"
            class="flex items-center space-x-2 px-3 py-1.5 sm:px-3.5 sm:py-2 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200/70 dark:hover:bg-slate-700/80 border border-slate-200/80 dark:border-slate-700/80 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 transition-all shadow-sm"
          >
            <Calendar class="w-3.5 h-3.5 text-brand-500" />
            <span class="hidden sm:inline">{{ getFilterLabel }}</span>
            <span class="sm:hidden">{{ selectedDateFilter.toUpperCase() }}</span>
            <ChevronDown class="w-3.5 h-3.5 text-slate-400 transition-transform" :class="{ 'rotate-180': isDropdownOpen }" />
          </button>

          <!-- Dropdown Menu -->
          <div
            v-if="isDropdownOpen"
            class="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-50 py-1 overflow-hidden"
          >
            <button
              v-for="opt in dateFilterOptions"
              :key="opt.value"
              @click="selectFilter(opt.value)"
              :class="[
                'w-full text-left px-4 py-2 text-xs font-medium transition-colors flex items-center justify-between',
                selectedDateFilter === opt.value
                  ? 'bg-brand-500/10 text-brand-600 dark:text-brand-400 font-semibold'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              ]"
            >
              <span>{{ opt.label }}</span>
              <span v-if="selectedDateFilter === opt.value" class="w-1.5 h-1.5 rounded-full bg-brand-500"></span>
            </button>
          </div>
        </div>

        <!-- Theme Toggle Button -->
        <button
          @click="emit('toggleTheme')"
          class="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 border border-transparent dark:border-slate-800 transition-all"
          :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
        >
          <Sun v-if="isDark" class="w-4 h-4 text-amber-400" />
          <Moon v-else class="w-4 h-4 text-slate-600" />
        </button>

        <!-- Notifications Bell -->
        <button class="relative p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all">
          <Bell class="w-4 h-4" />
          <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white dark:ring-slate-900 animate-ping"></span>
          <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
        </button>

        <div class="h-6 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block"></div>

        <!-- User Profile Placeholder -->
        <div class="flex items-center space-x-3 cursor-pointer group">
          <div class="relative">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              alt="User Profile"
              class="w-9 h-9 rounded-xl object-cover ring-2 ring-brand-500/30 group-hover:ring-brand-500 transition-all"
            />
            <span class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
          </div>
          <div class="hidden md:flex flex-col text-left">
            <span class="text-xs font-bold text-slate-900 dark:text-white leading-tight">Alexandre Vance</span>
            <span class="text-[10px] font-medium text-slate-400 dark:text-slate-500">Principal Architect</span>
          </div>
        </div>

      </div>

    </div>
  </header>
</template>
