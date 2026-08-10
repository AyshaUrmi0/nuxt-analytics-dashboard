<script setup lang="ts">
defineProps<{
    title: string
    value: string
    change: string

}>()
</script>

<template>
    <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
    <p class="text-sm font-medium text-gray-500">
      {{ title }}
    </p>

    <p class="mt-2 text-2xl font-bold text-gray-900">
      {{ value }}
    </p>

    <p class="mt-2 text-sm font-medium text-green-600">
      {{ change }}
    </p>
  </div>
</template>