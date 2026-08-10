<script setup lang="ts">
import * as echarts from "echarts"
import { onMounted, onBeforeUnmount, ref } from "vue"

const chartRef = ref<HTMLElement | null>(null)

let chart: echarts.ECharts | null = null

const renderChart = () => {
  if (!chartRef.value) return

  chart = echarts.init(chartRef.value)

  const option: echarts.EChartsOption = {
    title: {
      text: "Sales by Category",
    },

    tooltip: {
      trigger: "item",
    },

    series: [
      {
        name: "Sales",
        type: "pie",

        radius: "60%",

        data: [
          {
            value: 1048,
            name: "Electronics",
          },
          {
            value: 735,
            name: "Clothing",
          },
          {
            value: 580,
            name: "Furniture",
          },
          {
            value: 484,
            name: "Books",
          },
          {
            value: 300,
            name: "Other",
          },
        ],

        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  }

  chart.setOption(option)
}

const handleResize = () => {
  chart?.resize()
}

onMounted(() => {
  renderChart()

  window.addEventListener("resize", handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize)

  chart?.dispose()
})
</script>

<template>
  <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
    <div
      ref="chartRef"
      class="h-80 w-full"
    ></div>
  </div>
</template>